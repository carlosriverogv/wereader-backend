import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSharedLibraryDto } from './dto/create-shared-library.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Friendship } from 'src/friendship/entities/friendship.entity';
import { SharedLibrary } from './entities/shared-library.entity';
import { Library } from 'src/library/entities/library.entity';

@Injectable()
export class SharedLibraryService {
  constructor(
    @InjectModel('sharedLibrary')
    private readonly sharedLibraryModel: Model<SharedLibrary>,
    @InjectModel('friendship')
    private readonly friendshipModel: Model<Friendship>,
    @InjectModel('library')
    private readonly libraryModel: Model<Library>,
  ) {}
  /**
   * Crear una biblioteca compartida
   * @param createSharedLibraryDto Los datos de la biblioteca compartida a crear
   * @description Crear una biblioteca compartida
   * @returns {Promise<{ ok: boolean; message: string; resultado: SharedLibrary }>} La biblioteca compartida creada
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */

  async share(
    idUserOwner: string,
    createSharedLibraryDto: CreateSharedLibraryDto,
  ): Promise<{
    ok: boolean;
    message: string;
    resultado: SharedLibrary;
  }> {
    try {
      // Obtener el ID del usuario que recibe la biblioteca compartida
      const idUserFriend = createSharedLibraryDto.idUserFriend;

      // Verificar si existe una amistad entre los usuarios
      const friendship = await this.friendshipModel.findOne({
        $or: [
          {
            idUser1: idUserOwner,
            idUser2: idUserFriend,
            status: 'accepted',
          },
          {
            idUser1: idUserFriend,
            idUser2: idUserOwner,
            status: 'accepted',
          },
        ],
      });

      if (!friendship) {
        throw new NotFoundException('No existe una amistad entre los usuarios');
      }

      // Verificar si ya existe una biblioteca compartida entre los usuarios
      const existingSharedLibrary = await this.sharedLibraryModel.findOne({
        $or: [
          {
            idUserOwner: idUserOwner,
            idUserFriend: idUserFriend,
          },
        ],
      });
      if (existingSharedLibrary) {
        throw new ConflictException(
          'El usuario ya tiene una biblioteca compartida con este amigo',
        );
      }

      // Obtener la biblioteca del usuario propietario
      const library: Library | null = await this.libraryModel.findOne({
        idUser: idUserOwner,
      });

      if (!library) {
        throw new NotFoundException(
          'No existe la biblioteca del usuario propietario',
        );
      }

      // Crear la biblioteca compartida
      const sharedLibrary = new this.sharedLibraryModel({
        idUserOwner: new mongoose.Types.ObjectId(idUserOwner),
        idUserFriend: new mongoose.Types.ObjectId(idUserFriend),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        idLibrary: new mongoose.Types.ObjectId(library.id),
      });
      await sharedLibrary.save();

      // Devolver la biblioteca compartida creada
      return {
        ok: true,
        message: 'Biblioteca compartida correctamente',
        resultado: sharedLibrary,
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error inesperado creando la biblioteca compartida: ' + error,
        );
      }
    }
  }

  async getSharedWithMe(idUserAuth: string): Promise<SharedLibrary[]> {
    try {
      const sharedLibraries = await this.sharedLibraryModel
        .find({ idUserFriend: idUserAuth }) // Filtra por el usuario que recibió la biblioteca
        .populate({
          path: 'idLibrary', // Carga la información completa de la biblioteca
          populate: { path: 'books' }, // Carga los libros de la biblioteca
        })
        .populate({
          path: 'idUserOwner', // Carga la información del propietario de la biblioteca
          select: 'name tag', // Obtenemos los datos esenciables del propietario
        })
        .exec();

      if (!sharedLibraries || sharedLibraries.length === 0) {
        throw new NotFoundException(
          'No se encontraron bibliotecas compartidas con el usuario autenticado',
        );
      }

      return sharedLibraries;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error inesperado obteniendo las bibliotecas compartidas: ' + error,
        );
      }
    }
  }
}
