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
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Get('search/:isbn')
  findByIsbn(@Param('isbn') isbn: string) {
    return this.bookService.findByIsbn(isbn);
  }

  @UseGuards(AuthGuard)
  @Get('search/title/:title')
  findByTitle(@Param('title') title: string) {
    return this.bookService.findByTitle(title);
  }

  @UseGuards(AuthGuard)
  @Get('search/author/:author')
  findByAuthor(@Param('author') author: string) {
    return this.bookService.findByAuthor(author);
  }

  @UseGuards(AuthGuard)
  @Get('search/gender/:gender')
  findByGender(@Param('gender') gender: string) {
    return this.bookService.findByGender(gender);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
