import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Libros')
@ApiBearerAuth()
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Añadir un nuevo libro' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos los libros' })
  findAll() {
    return this.bookService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Buscar un libro por ID' })
  findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Get('search/:isbn')
  @ApiOperation({ summary: 'Buscar un libro por ISBN' })
  findByIsbn(@Param('isbn') isbn: string) {
    return this.bookService.findByIsbn(isbn);
  }

  @UseGuards(AuthGuard)
  @Get('search/title/:title')
  @ApiOperation({ summary: 'Buscar libros por título' })
  findByTitle(@Param('title') title: string) {
    return this.bookService.findByTitle(title);
  }

  @UseGuards(AuthGuard)
  @Get('search/author/:author')
  @ApiOperation({ summary: 'Buscar libros por autor' })
  findByAuthor(@Param('author') author: string) {
    return this.bookService.findByAuthor(author);
  }

  @UseGuards(AuthGuard)
  @Get('search/gender/:gender')
  @ApiOperation({ summary: 'Buscar libros por género' })
  findByGender(@Param('gender') gender: string) {
    return this.bookService.findByGender(gender);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un libro' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un libro' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
