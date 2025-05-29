import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { Book } from './entities/book.entity';

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
  @Get('newReleases')
  @ApiOperation({ summary: 'Lista los 20 libros publicados más recientemente' })
  async getLatestPublishedBooks() {
    return this.bookService.findLatestPublished();
  }

  @UseGuards(AuthGuard)
  @Get('bestsellers')
  @ApiOperation({ summary: 'Lista los 20 libros más vendidos' })
  async getTopDownloadedBooks() {
    return this.bookService.findTopDownloaded();
  }

  @UseGuards(AuthGuard)
  @Get('recommended')
  @ApiOperation({ summary: 'Lista los 20 libros recomendados para el usuario' })
  async getRecommendedBooks(@Request() req: RequestWithUser): Promise<Book[]> {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('El token no contiene un userId');
    }
    return await this.bookService.findRecommendedForUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Buscar un libro por ID' })
  findById(@Param('id') id: string): Promise<Book> {
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
  @Get('search/genre/:genre')
  @ApiOperation({ summary: 'Buscar libros por género' })
  findByGenre(@Param('genre') genre: string) {
    return this.bookService.findByGenre(genre);
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
