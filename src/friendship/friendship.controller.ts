import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Relaciones de amistad')
@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Nueva solicitud de amistad',
    description:
      'Crea una relación de amistad entre el usuario autenticado y el usario del DTO en estado PENDIENTE',
  })
  async create(
    @Request() req: RequestWithUser,
    @Body() createFriendshipDto: CreateFriendshipDto,
  ) {
    const idUser1 = req.user.sub;
    if (!idUser1) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return await this.friendshipService.createFriendship(
      idUser1,
      createFriendshipDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get('myfriendships')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener los amigos del usuario autenticado',
  })
  async getMyFriendships(@Request() req: RequestWithUser) {
    const idUserAuth = req.user.sub;
    console.log('ID de usuario autenticado:', idUserAuth);
    if (!idUserAuth) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return await this.friendshipService.findAllFriendships(idUserAuth);
  }

  @UseGuards(AuthGuard)
  @Get('myfriendships/received')
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Obtener las solicitudes de amistad recibidas por el usuario autenticado',
  })
  async getMyRequestFriendships(@Request() req: RequestWithUser) {
    const idUserAuth = req.user.sub;
    if (!idUserAuth) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return await this.friendshipService.findAllRequest(idUserAuth);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/accept')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Aceptar solicitud de amistad',
  })
  async acceptFriendship(
    @Param('id') idFriendship: string,
    @Request() req: RequestWithUser,
  ) {
    const idUserAuth = req.user.sub;
    if (!idUserAuth) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return await this.friendshipService.acceptFriendship(
      idFriendship,
      idUserAuth,
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':id/reject')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Rechazar solicitud de amistad',
  })
  async rejectFriendship(
    @Param('id') idFriendship: string,
    @Request() req: RequestWithUser,
  ) {
    const idUserAuth = req.user.sub;
    if (!idUserAuth) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return await this.friendshipService.rejectFriendship(
      idFriendship,
      idUserAuth,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id/delete')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar relación de amistad por su ID',
    description: 'Elimina la relación de amistad con el ID proporcionado',
  })
  async deleteFriendship(
    @Param('id') idFriendship: string,
    @Request() req: RequestWithUser,
  ) {
    const idUserAuth = req.user.sub;
    if (!idUserAuth) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return await this.friendshipService.deleteFriendship(
      idFriendship,
      idUserAuth,
    );
  }
}
