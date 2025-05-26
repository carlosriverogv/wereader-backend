import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { SharedLibraryService } from './shared-library.service';
import { CreateSharedLibraryDto } from './dto/create-shared-library.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { SharedLibraryWrapper } from './entities/SharedLibraryWrapper';
import { DeleteSharedLibraryDto } from './dto/delete-shared-library.dto';

@ApiTags('Bibliotecas compartidas')
@Controller('sharedlibrary')
export class SharedLibraryController {
  constructor(private readonly sharedLibraryService: SharedLibraryService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Compartir biblioteca',
    description:
      'Crea una biblioteca compartida entre el usuario autenticado y el usario del DTO',
  })
  async create(
    @Request() req: RequestWithUser,
    @Body() createSharedLibraryDto: CreateSharedLibraryDto,
  ) {
    const idUserOwner = req.user.sub;
    if (!idUserOwner) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return this.sharedLibraryService.share(idUserOwner, createSharedLibraryDto);
  }

  @UseGuards(AuthGuard)
  @Get('sharedWithMe')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener la biblioteca compartida con el usuario autenticado',
    description:
      'Obtiene las bibliotecas compartidas con el usuario autenticado',
  })
  async getSharedWithMe(@Request() req: RequestWithUser) {
    const idUserAuth = req.user.sub;
    if (!idUserAuth) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return await this.sharedLibraryService.getSharedWithMe(idUserAuth);
  }

  // Obtiene las bibliotecas compartidas por el usuario autenticado
  @UseGuards(AuthGuard)
  @Get('sharedByMe')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener la biblioteca compartidas por el usuario autenticado',
    description: 'Obtiene la biblioteca compartidas por el usuario autenticado',
  })
  async getSharedByMe(
    @Request() req: RequestWithUser,
  ): Promise<SharedLibraryWrapper> {
    const idUserAuth = req.user.sub;
    if (!idUserAuth) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    const sharedLibrary =
      await this.sharedLibraryService.getSharedByMe(idUserAuth);

    return { sharedLibrary: sharedLibrary ?? null };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar biblioteca compartida',
    description: 'Elimina la biblioteca compartida con el ID proporcionado',
  })
  async deleteSharedLibrary(
    @Request() req: RequestWithUser,
    @Param('id') idSharedLibrary: string,
  ) {
    const idUserAuth = req.user.sub;
    if (!idUserAuth) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return await this.sharedLibraryService.deleteSharedLibrary(idSharedLibrary);
  }

  @UseGuards(AuthGuard)
  @Post('unshareMyLibrary')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dejar de compartir mi biblioteca' })
  async unshareLibrary(
    @Request() req: RequestWithUser,
    @Body() dto: DeleteSharedLibraryDto,
  ) {
    const idUserAuth = req.user.sub;
    if (!idUserAuth) {
      throw new UnauthorizedException('El token no contiene un ID de usuario');
    }
    return this.sharedLibraryService.deleteSharedByMe(
      idUserAuth,
      dto.idOtherUser,
    );
  }
}
