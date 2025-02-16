import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Get('search/:isbn')
  findByIsbn(@Param('isbn') isbn: string) {
    return this.bookService.findByIsbn(isbn);
  }

  @Get('search/title/:title')
  findByTitle(@Param('title') title: string) {
    return this.bookService.findByTitle(title);
  }

  @Get('search/author/:author')
  findByAuthor(@Param('author') author: string) {
    return this.bookService.findByAuthor(author);
  }

  @Get('search/gender/:gender')
  findByGender(@Param('gender') gender: string) {
    return this.bookService.findByGender(gender);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
