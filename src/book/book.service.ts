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
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('book')
    private readonly bookModel: Model<Book>,
    @InjectModel('user')
    private readonly userModel: Model<User>,
  ) {}

  /**
   * @description Servicio de inserción de nuevos libros
   * @param createBookDto - Datos del libro a insertar
   * @returns {Promise<{ ok: boolean; resultado: Book }>} - Libro insertado
   * @throws ConflictException - Si el libro ya existe
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async create(
    createBookDto: CreateBookDto,
  ): Promise<{ ok: boolean; resultado: Book }> {
    try {
      // Verificar si el libro ya existe
      const existingBook = await this.bookModel
        .findOne({
          isbn: createBookDto.isbn,
        })
        .exec();

      // Si el libro ya existe, lanzamos una excepción de conflicto
      if (existingBook) {
        throw new ConflictException(
          `El libro con ISBN '${createBookDto.isbn}' ya existe.`,
        );
      }

      // Si el libro no existe, lo creamos
      const newBook = new this.bookModel(createBookDto);

      // Guardamos el libro en la base de datos
      await newBook.save();

      return { ok: true, resultado: newBook };
    } catch (error: any) {
      // Si el error es un ConflictException, lo relanzamos directamente
      if (error instanceof ConflictException) {
        throw error;
      } else {
        // Capturamos errores inesperados
        throw new InternalServerErrorException(
          'Error inesperado creando el libro: ' + error,
        );
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Error inesperado buscando libros: ' + error,
      );
    }
  }

  /**
   * @description Búsqueda en tiempo real por título, autor o género
   * @param query - Texto a buscar
   * @returns {Promise<Book[]>} - Lista de hasta 25 libros que coincidan
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async searchBooks(query: string): Promise<Book[]> {
    try {
      const regex = new RegExp(query, 'i');

      const resultado = await this.bookModel
        .find({
          $or: [
            { title: { $regex: regex } },
            { author: { $regex: regex } },
            { genre: { $regex: regex } },
            { isbn: { $regex: regex } },
          ],
        })
        .limit(25);

      return resultado || [];
    } catch (error) {
      throw new InternalServerErrorException(
        `Error inesperado buscando libros con el texto '${query}': ` + error,
      );
    }
  }

  /**
   * @description Servicio para obtener los 20 libros más recientemente publicados
   * @returns {Promise<Book[]>} - Lista de libros ordenados por fecha de publicación
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async findLatestPublished(): Promise<Book[]> {
    try {
      const resultado = await this.bookModel
        .find({ datePublished: { $ne: null } }) // Nos aseguramos de que tenga fecha de publicación
        .sort({ datePublished: -1 }) // Orden descendente
        .limit(20); // Limitamos a 20 resultados

      return resultado || [];
    } catch (error) {
      throw new InternalServerErrorException(
        `Error inesperado al buscar libros más recientemente publicados: ` +
          error,
      );
    }
  }

  /**
   * @description Servicio para obtener los 20 libros más descargados (más vendidos)
   * @returns {Promise<Book[]>} - Lista de libros ordenados por número de descargas
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async findTopDownloaded(): Promise<Book[]> {
    try {
      const resultado = await this.bookModel
        .find()
        .sort({ downloads: -1 }) // Orden descendente por descargas
        .limit(20); // Máximo 20 libros

      return resultado || [];
    } catch (error) {
      throw new InternalServerErrorException(
        `Error inesperado al buscar los libros más descargados: ` + error,
      );
    }
  }

  /**
   * @description Servicio para obtener libros recomendados para un usuario con 5 del autor favorito y 15 del género favorito
   * @param idUserAuth - ID del usuario autenticado
   * @returns {Promise<Book[]>} - Lista de libros recomendados
   * @throws NotFoundException - Si el usuario no existe
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async findRecommendedForUser(idUserAuth: string): Promise<Book[]> {
    try {
      const user = await this.userModel.findById(idUserAuth);
      if (!user) {
        throw new NotFoundException(
          `Usuario con ID '${idUserAuth}' no encontrado`,
        );
      }

      const { authorFav, genreFav } = user;

      // Buscar hasta 5 libros del autor favorito
      const booksByAuthor = await this.bookModel
        .find({ author: authorFav })
        .sort({ downloads: -1 })
        .limit(5);

      // Buscar hasta 15 libros del género favorito
      const booksByGenre = await this.bookModel
        .find({ genre: genreFav })
        .sort({ downloads: -1 })
        .limit(15);

      // Usar un mapa para evitar duplicados
      const combinedMap = new Map<string, Book>();
      const finalBooks: Book[] = [];

      // Añadir libros por autor
      for (const book of booksByAuthor) {
        if (!combinedMap.has(String(book._id))) {
          combinedMap.set(String(book._id), book);
          finalBooks.push(book);
        }
      }

      // Añadir libros por género, sin duplicados
      for (const book of booksByGenre) {
        if (!combinedMap.has(String(book._id))) {
          combinedMap.set(String(book._id), book);
          finalBooks.push(book);
        }
      }

      // Si hay menos de 20 libros, rellenar con más libros del género o autor
      if (finalBooks.length < 20) {
        const alreadyIncludedIds = Array.from(combinedMap.keys());

        const additionalBooks = await this.bookModel
          .find({
            $or: [{ author: authorFav }, { genre: genreFav }],
            _id: { $nin: alreadyIncludedIds },
          })
          .sort({ downloads: -1 })
          .limit(20 - finalBooks.length);

        for (const book of additionalBooks) {
          if (!combinedMap.has(String(book._id))) {
            combinedMap.set(String(book._id), book);
            finalBooks.push(book);
          }
        }
      }

      return finalBooks.slice(0, 20);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error inesperado al buscar libros recomendados para el usuario '${idUserAuth}': ` +
          error,
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
          `Error inesperado buscando libro con ID '${id}': ` + error,
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
          `Error inesperado buscando libro con ISBN '${isbn}': ` + error,
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
    } catch (error) {
      throw new InternalServerErrorException(
        `Error inesperado buscando libros con Título '${title}': ` + error,
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
    } catch (error) {
      throw new InternalServerErrorException(
        `Error inesperado buscando libros con Autor '${author}': ` + error,
      );
    }
  }

  /**
   * @description Servicio de búsqueda de libros por género
   * @param genre - Género del libro a buscar
   * @returns {Promise<Book[]>} - Lista de libros encontrados
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async findByGenre(genre: string): Promise<Book[]> {
    try {
      const resultado = await this.bookModel.find({ genre });
      return resultado || [];
    } catch (error) {
      throw new InternalServerErrorException(
        `Error inesperado buscando libros con Género '${genre}': ` + error,
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
          `Error inesperado actualizando el libro con ID '${id}': ` + error,
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
          `Error inesperado borrando el libro con ID '${id}': ` + error,
        );
      }
    }
  }
}
