import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una biblioteca nueva' })
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  // @Get()
  // findAll() {
  //   return this.libraryService.findAll();
  // }

  @UseGuards(AuthGuard)
  @Get('mylibrary/:idUser')
  @ApiOperation({ summary: 'Buscar la biblioteca del usuario' })
  findMyLibrary(@Param('idUser') idUser: string) {
    return this.libraryService.findByUserOwner(idUser);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.libraryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
  //   return this.libraryService.update(+id, updateLibraryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.libraryService.remove(+id);
  // }
}
