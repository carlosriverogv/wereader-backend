import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @ApiOperation({ summary: 'Crear un usuario' })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('search/:tag')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar un usuario por tag' })
  searchUser(@Param('tag') tag: string) {
    return this.userService.findByTag(tag);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
