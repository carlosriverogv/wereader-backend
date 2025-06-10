import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @ApiOperation({ summary: 'Crear un usuario' })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // Recibir el perfil del usuario autenticado
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  async findMyProfile(@Request() req: RequestWithUser): Promise<User> {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('El token no contiene un userId');
    }
    return this.userService.findProfileById(userId);
  }

  // Recibir el perfil del usuario por tag
  @UseGuards(AuthGuard)
  @Get('search/:tag')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar usuarios por coincidencia de TAG' })
  async searchByTag(
    @Request() req: RequestWithUser,
    @Param('tag') tag: string,
  ): Promise<User[]> {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('El token no contiene un userId');
    }
    return await this.userService.searchByTag(userId, tag);
  }

  // Recibir el perfil del usuario por ID
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener el perfil del usuario por ID' })
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findProfileById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // Eliminar un usuario por ID
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  // Métodos adicionales para actualizar el perfil del usuario -------------------------------------------

  // Actualizar el avatar del usuario autenticado
  // Actualizar el autor favorito del usuario autenticado
  // Actualizar el género favorito del usuario autenticado
}
