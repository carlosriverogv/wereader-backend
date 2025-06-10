import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { Library } from './entities/library.entity';
import { AddBookToLibraryDto } from './dto/addbook-library.dto';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una biblioteca nueva' })
  async create(@Body() createLibraryDto: CreateLibraryDto) {
    return await this.libraryService.create(createLibraryDto);
  }

  // @UseGuards(AuthGuard)
  // @Post()
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Añadir un libro a la biblioteca' })
  // async addBook(@Body() createLibraryDto: CreateLibraryDto) {
  //   return await this.libraryService.addBook(createLibraryDto);
  // }

  @UseGuards(AuthGuard)
  @Get('mylibrary')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener la biblioteca del usuario autenticado' })
  async findMyLibrary(@Request() req: RequestWithUser): Promise<Library> {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('El token no contiene un userId');
    }
    return await this.libraryService.findByOwnerId(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':idOwner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener la biblioteca por ID de usuario' })
  async findByOwnerId(@Param('idOwner') idOwner: string): Promise<Library> {
    return await this.libraryService.findByOwnerId(idOwner);
  }

  @UseGuards(AuthGuard)
  @Patch('addBook')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Añadir un libro a la biblioteca' })
  async addBook(
    @Request() req: RequestWithUser,
    @Body() addBookToLibraryDto: AddBookToLibraryDto,
  ): Promise<{ ok: boolean; message: string }> {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('El token no contiene un userId');
    }
    return await this.libraryService.addBookToLibrary(
      userId,
      addBookToLibraryDto,
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.libraryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
  //   return this.libraryService.update(+id, updateLibraryDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Elimina la biblioteca por su ID' })
  remove(@Param('id') id: string) {
    return this.libraryService.remove(id);
  }
}
