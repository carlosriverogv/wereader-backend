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

      // Verificar que el usuario propietario no haya compartido ya su biblioteca con cualquier otro usuario
      const isAlreadySharing = await this.sharedLibraryModel.findOne({
        idUserOwner: idUserOwner,
      });
      if (isAlreadySharing) {
        throw new ConflictException(
          'Actualmente ya estas compartiendo tu biblioteca con otro usuario',
        );
      }

      // Verificar si el usuario ya ha recibido una biblioteca compartida de cualquier otro usuario
      const alreadyReceivedLibrary = await this.sharedLibraryModel.findOne({
        idUserFriend: idUserFriend,
      });

      if (alreadyReceivedLibrary) {
        throw new ConflictException(
          'El usuario ya ha recibido una biblioteca compartida de otro usuario',
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

  /**
   * Obtener las bibliotecas compartidas con el usuario autenticado
   * @param idUserAuth El ID del usuario autenticado
   * @description Obtener las bibliotecas compartidas con el usuario autenticado
   * @returns {Promise<SharedLibrary[]>} Las bibliotecas compartidas con el usuario autenticado
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async getSharedWithMe(idUserAuth: string): Promise<SharedLibrary> {
    try {
      const sharedLibrary = await this.sharedLibraryModel
        .findOne({ idUserFriend: idUserAuth }) // Filtra por el usuario que recibió la biblioteca
        .populate({
          path: 'idLibrary',
          select: 'books',
          populate: {
            path: 'books',
            match: { shareable: true }, // 👈 Filtrar solo libros compartibles
          },
        })
        .populate({
          path: 'idUserOwner', // Carga la información del propietario de la biblioteca
          select: 'name tag', // Obtenemos los datos esenciables del propietario
        })
        .exec();

      if (!sharedLibrary) {
        throw new NotFoundException(
          'No se encontraron bibliotecas compartidas con el usuario autenticado',
        );
      }

      return sharedLibrary;
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

  /**
   * Obtener la biblioteca compartida por el usuario autenticado
   * @param idUserAuth El ID del usuario autenticado
   * @description Obtener la biblioteca compartida por el usuario autenticado
   * @returns {Promise<SharedLibrary | null>} La biblioteca compartida o null si no hay ninguna
   */
  async getSharedByMe(idUserAuth: string): Promise<SharedLibrary | null> {
    try {
      const sharedLibrary = await this.sharedLibraryModel
        .findOne({ idUserOwner: idUserAuth })
        .exec();

      return sharedLibrary; // Si es null, se retorna null sin lanzar error
    } catch (error) {
      throw new InternalServerErrorException(
        'Error inesperado obteniendo la biblioteca compartida: ' + error,
      );
    }
  }

  /**
   * Eliminar una biblioteca compartida
   * (PROVISIONAL) (Cambiar por eliminar sharedLibrary usando el ID de los dos usuarios) !!
   * @param idSharedLibrary El ID de la biblioteca compartida a eliminar
   * @description Eliminar una biblioteca compartida
   * @returns {Promise<{ ok: boolean; message: string }>} Mensaje de éxito
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async deleteSharedLibrary(
    idSharedLibrary: string,
  ): Promise<{ ok: boolean; message: string }> {
    try {
      const result = await this.sharedLibraryModel.deleteOne({
        _id: idSharedLibrary,
      });

      if (result.deletedCount === 0) {
        throw new NotFoundException('No se encontró la biblioteca compartida');
      }

      return {
        ok: true,
        message: 'Biblioteca compartida eliminada correctamente',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error inesperado eliminando la biblioteca compartida: ' + error,
      );
    }
  }

  async deleteSharedByMe(idUserAuth: string, idUserFriend: string) {
    try {
      const result = await this.sharedLibraryModel.deleteOne({
        idUserOwner: idUserAuth,
        idUserFriend: idUserFriend,
      });

      if (result.deletedCount === 0) {
        throw new NotFoundException(
          'No se encontró una biblioteca compartida que hayas enviado a ese usuario',
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error inesperado eliminando la biblioteca compartida: ' + error,
      );
    }

    return {
      ok: true,
      message: 'Has dejado de compartir tu biblioteca con ese usuario',
    };
  }

  async deleteSharedWithMe(idUserAuth: string, idUserOwner: string) {
    const result = await this.sharedLibraryModel.deleteOne({
      idUserOwner: idUserOwner,
      idUserFriend: idUserAuth,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'No se encontró una biblioteca compartida que te hayan enviado desde ese usuario',
      );
    }

    return {
      ok: true,
      message: 'Has dejado de recibir la biblioteca compartida de ese usuario',
    };
  }
}
