import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { SharedLibraryService } from './shared-library.service';
import { CreateSharedLibraryDto } from './dto/create-shared-library.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@Controller('shared-library')
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
}
