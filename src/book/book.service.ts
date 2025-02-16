import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('books')
    private readonly bookModel: Model<Book>,
  ) {}

  /**
   * @description Servicio de inserción de nuevos libros
   * @param createBookDto - Datos del libro a insertar
   * @returns {Promise<Book>} - Libro insertado
   * @throws ConflictException - Si el libro ya existe
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async create(
    createBookDto: CreateBookDto,
  ): Promise<{ ok: boolean; resultado: Book }> {
    try {
      // Verificar si el libro ya existe
      const existingBook = await this.bookModel.findOne({
        isbn: createBookDto.isbn,
      });

      // Si el libro ya existe, lanzamos una excepción de conflicto
      if (existingBook) {
        throw new ConflictException(
          `El libro con ISBN '${createBookDto.isbn}' ya existe.`,
        );
      }

      // Si el libro no existe, lo creamos
      const newBook = await this.bookModel.create(createBookDto);
      return { ok: true, resultado: newBook };
    } catch (error) {
      // Si el error es un ConflictException, lo relanzamos directamente
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      } else {
        // Capturamos errores inesperados
        throw new InternalServerErrorException('Error insertando libro');
      }
    }
  }

  /**
   * @description Servicio de búsqueda de todos los libros
   * @returns {Promise<Book[]>} - Lista de libros encontrados
   * @throws InternalServerErrorException
   */
  async findAll(): Promise<Book[]> {
    try {
      const resultado = await this.bookModel.find();
      return resultado || [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        'Error inesperado buscando libros',
      );
    }
  }

  /**
   * @description Servicio de búsqueda de libros por ID
   * @param id - ID del libro a buscar
   * @returns {Promise<Book>} - Libro encontrado
   * @throws NotFoundException - Si el libro no existe
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async findById(id: string): Promise<Book> {
    try {
      const resultado = await this.bookModel.findById(id);
      if (!resultado) {
        throw new NotFoundException(`ID '${id}' de libro no encontrado`);
      }
      return resultado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(
          `Error inesperado buscando libro con ID '${id}'`,
        );
      }
    }
  }

  /**
   * @description Servicio de búsqueda de libros por ISBN
   * @param isbn - ISBN del libro a buscar
   * @returns {Promise<Book>} - Libro encontrado
   * @throws NotFoundException - Si el libro no existe
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async findByIsbn(isbn: string): Promise<Book> {
    try {
      const resultado = await this.bookModel.findOne({ isbn });
      if (!resultado) {
        throw new NotFoundException(`ISBN '${isbn}' de libro no encontrado`);
      }
      return resultado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(
          `Error inesperado buscando libro con ISBN '${isbn}'`,
        );
      }
    }
  }

  /**
   * @description Servicio de búsqueda de libros por título
   * @param title - Título del libro a buscar
   * @returns {Promise<Book[]>} - Lista de libros encontrados
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async findByTitle(title: string): Promise<Book[]> {
    try {
      const resultado = await this.bookModel.find({ title });
      return resultado || [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        `Error inesperado buscando libros con Título '${title}'`,
      );
    }
  }

  /**
   * @description Servicio de búsqueda de libros por autor
   * @param author - Autor del libro a buscar
   * @returns {Promise<Book[]>} - Lista de libros encontrados
   * @throws NotFoundException - Si el autor no existe
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async findByAuthor(author: string): Promise<Book[]> {
    try {
      const resultado = await this.bookModel.find({ author });
      return resultado || [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        `Error inesperado buscando libros con Autor '${author}'`,
      );
    }
  }

  /**
   * @description Servicio de búsqueda de libros por género
   * @param gender - Género del libro a buscar
   * @returns {Promise<Book[]>} - Lista de libros encontrados
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async findByGender(gender: string): Promise<Book[]> {
    try {
      const resultado = await this.bookModel.find({ gender });
      return resultado || [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        `Error inesperado buscando libros con Género '${gender}'`,
      );
    }
  }

  /**
   * @description Servicio de actualización de libros
   * @param id - ID del libro a actualizar
   * @param updateBookDto - Datos del libro a actualizar
   * @returns {Promise<Book>} - Libro actualizado
   * @throws NotFoundException - Si el libro no existe
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      const bookUpdated = await this.bookModel.findByIdAndUpdate(
        id,
        { $set: updateBookDto },
        { new: true },
      );
      if (!bookUpdated) {
        throw new NotFoundException(`ID '${id}' de libro no encontrado`);
      }
      return bookUpdated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(
          `Error inesperado actualizando el libro con ID '${id}'`,
        );
      }
    }
  }

  /**
   * @description Servicio de eliminación de libros
   * @param id - ID del libro a eliminar
   * @returns {Promise<Book>} - Libro eliminado
   * @throws NotFoundException - Si el libro no existe
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async remove(id: string): Promise<Book> {
    try {
      const resultado = await this.bookModel.findByIdAndDelete(id);
      if (!resultado) {
        throw new NotFoundException(`ID '${id}' de libro no encontrado`);
      }
      return resultado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(
          `Error inesperado borrando el libro con ID '${id}'`,
        );
      }
    }
  }
}
