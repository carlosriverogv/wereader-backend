import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { Library } from './entities/library.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/book/entities/book.entity';
import { AddBookToLibraryDto } from './dto/addbook-library.dto';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel('library')
    private readonly libraryModel: Model<Library>,
    @InjectModel('book')
    private readonly bookModel: Model<Book>,
  ) {}

  /**
   * Crear una biblioteca
   * @param createLibraryDto Los datos de la biblioteca a crear
   * @description Crear una biblioteca
   * @returns {Promise<{ ok: boolean; resultado: Library }>} La biblioteca creada
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async create(
    createLibraryDto: CreateLibraryDto,
  ): Promise<{ ok: boolean; resultado: Library }> {
    try {
      // Verificar si ya existe una biblioteca para el usuario
      const existingLibrary = await this.libraryModel.findOne({
        idUser: createLibraryDto.idUser,
      });

      // Si ya existe una biblioteca para el usuario, lanzar un error
      if (existingLibrary) {
        throw new ConflictException(
          'Ya existe una biblioteca para este usuario',
        );
      }

      // Crear la biblioteca
      const library = new this.libraryModel(createLibraryDto);
      await library.save();

      // Devolver la biblioteca creada
      return { ok: true, resultado: library };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error inesperado creando la biblioteca: ' + error,
        );
      }
    }
  }

  /**
   * Obtener la biblioteca por ID de usuario
   * @param idUser El ID del usuario
   * @description Obtener la biblioteca por ID de usuario
   * @returns {Promise<Library>} La biblioteca del usuario
   * @throws InternalServerErrorException Si no se encuentra la biblioteca
   */
  async findByOwnerId(idUser: string): Promise<Library> {
    try {
      const library = await this.libraryModel
        .findOne({ idUser })
        .populate('books') // Obtener la lista de libros
        //.populate('idUser') // Obtener los datos del usuario
        .exec();
      if (!library) {
        throw new InternalServerErrorException(
          'No se encontró la biblioteca del usuario',
        );
      }
      return library;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error inesperado buscando la biblioteca: ' + error,
      );
    }
  }

  /**
   * Añadir un libro a la biblioteca del usuario autenticado
   * @param idUser El ID del usuario
   * @param addBookToLibraryDto Los datos del libro a añadir
   * @description Añadir un libro a la biblioteca del usuario
   * @returns {Promise<Library>} La biblioteca actualizada
   * @throws NotFoundException Si no se encuentra la biblioteca o el libro
   * @throws ConflictException Si el libro ya está en la biblioteca
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async addBookToLibrary(
    idUser: string,
    addBookToLibraryDto: AddBookToLibraryDto,
  ): Promise<{ ok: boolean; message: string }> {
    try {
      const bookId = addBookToLibraryDto.bookId;

      // Buscar la biblioteca del usuario
      const library = await this.findByOwnerId(idUser);
      if (!library) {
        throw new NotFoundException('No se encontró la biblioteca del usuario');
      }

      // Buscar el libro por ID
      const book = await this.bookModel.findById(bookId).exec();
      if (!book) {
        throw new NotFoundException('No se encontró el libro');
      }

      const previousBookCount = library.books.length;

      // Actualizar la biblioteca agregando el nuevo libro
      const updatedLibrary = await this.libraryModel.findByIdAndUpdate(
        library._id,
        { $addToSet: { books: book._id } }, // Evita duplicados automáticamente
        { new: true }, // Retorna la biblioteca actualizada
      );

      if (!updatedLibrary) {
        throw new InternalServerErrorException(
          'Error añadiendo el libro a la biblioteca',
        );
      } else if (updatedLibrary.books.length === previousBookCount) {
        throw new ConflictException(
          'El libro ya está en la biblioteca, compra no realizada',
        );
      }

      // Incrementar downloads del libro en +1 (utilizado para la tienda)
      await this.bookModel.findByIdAndUpdate(
        bookId,
        { $inc: { downloads: 1 } },
        { new: true },
      );

      return { ok: true, message: 'Compra realizada correctamente' };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error inesperado añadiendo el libro a la biblioteca: ${error}`,
      );
    }
  }

  /**
   * Eliminar una biblioteca por ID
   * @param id El ID de la biblioteca a eliminar
   * @description Eliminar una biblioteca por ID
   * @returns {Promise<{ ok: boolean; resultado: Library }>} La biblioteca eliminada
   * @throws NotFoundException Si no se encuentra la biblioteca
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async remove(id: string): Promise<{ ok: boolean; resultado: Library }> {
    try {
      const library = await this.libraryModel.findByIdAndDelete({ id });
      if (!library) {
        throw new NotFoundException('No se encontró la biblioteca');
      }
      return { ok: true, resultado: library };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error inesperado eliminando la biblioteca: ' + error,
        );
      }
    }
  }
}
