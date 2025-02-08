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

  async create(createBookDto: CreateBookDto) {
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
        throw error;
      }

      // Capturamos errores inesperados
      throw new InternalServerErrorException('Error insertando libro');
    }
  }

  async findAll() {
    const resultado = await this.bookModel.find();
    return resultado;
  }

  async findOne(id: string) {
    const resultado = await this.bookModel.findById(id);
    if (!resultado) {
      throw new NotFoundException(`ID '${id}' de libro no encontrado`);
    }
    return resultado;
  }

  async findByIsbn(isbn: string) {
    const resultado = await this.bookModel.findOne({ isbn });
    return resultado;
  }

  async findByTitle(title: string) {
    const resultado = await this.bookModel.find({ title });
    return resultado;
  }

  async findByAuthor(author: string) {
    const resultado = await this.bookModel.find({ author });
    return resultado;
  }

  async findByGender(gender: string) {
    const resultado = await this.bookModel.find({ gender });
    return resultado;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const bookUpdated = await this.bookModel.findByIdAndUpdate(
      id,
      { $set: updateBookDto },
      { new: true },
    );
    return bookUpdated;
  }

  async remove(id: string) {
    const resultado = await this.bookModel.findByIdAndDelete(id);
    return resultado;
  }
}
