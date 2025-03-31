import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendshipService.findOne(+id);
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFriendshipDto: UpdateFriendshipDto,
  ) {
    return this.friendshipService.update(+id, updateFriendshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipService.remove(+id);
  }
}
