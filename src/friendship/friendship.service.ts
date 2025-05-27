import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { Friendship } from './entities/friendship.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { SharedLibrary } from 'src/shared-library/entities/shared-library.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectModel('friendship')
    private readonly friendshipModel: Model<Friendship>,
    @InjectModel('user')
    private readonly userModel: Model<User>,
    @InjectModel('sharedLibrary')
    private readonly sharedLibraryModel: Model<SharedLibrary>,
  ) {}

  /**
   * Crea una nueva solicitud de amistad
   * @param idUser1 ID del usuario que envía la solicitud
   * @param createFriendshipDto Datos de la solicitud de amistad (idUser2 es el ID del usuario que recibe la solicitud)
   * @returns {Promise<{ ok: boolean; message: string; newFriendship: Friendship }>} La nueva amistad creada
   * @throws ConflictException Si ya existe una relación de amistad entre los usuarios
   * @throws BadRequestException Si se intenta enviar una solicitud a uno mismo
   */
  async createFriendship(
    idUser1: string,
    createFriendshipDto: CreateFriendshipDto,
  ): Promise<{ ok: boolean; message: string; newFriendship: Friendship }> {
    try {
      // Obtener el ID del usuario que recibe la solicitud de amistad
      const idUser2 = createFriendshipDto.idFriendUser;

      // Comprobar que no se envia amistad con el mismo usuario
      if (idUser1 === idUser2) {
        throw new BadRequestException(
          'No puedes enviarte una solicitud a ti mismo',
        );
      }

      // TODO: Separar la comprobación entre aceptada y pendiente-------------
      // Comprobar que no existe una solicitud de amistad pendiente
      const existingFriendship = await this.friendshipModel.findOne({
        $or: [
          { idUser1, idUser2, status: 'pending' },
          { idUser1: idUser2, idUser2: idUser1, status: 'pending' },
          { idUser1, idUser2, status: 'accepted' },
          { idUser1: idUser2, idUser2: idUser1, status: 'accepted' },
        ],
      });
      if (existingFriendship) {
        throw new ConflictException(
          'Ya hay una relación de amistad entre estos usuarios. Ya sea pendiente, aceptada.',
        );
      }

      // Buscar si existe una amistad rechazada entre los usuarios
      const rejectedFriendship = await this.friendshipModel.findOne({
        $or: [
          { idUser1, idUser2, status: 'rejected' },
          { idUser1: idUser2, idUser2: idUser1, status: 'rejected' },
        ],
      });

      // Si existe una amistad rechazada, la actualizamos a pendiente
      // Aquí se podrían implementar reglas adicionales, como un límite de tiempo para re-enviar solicitudes
      if (rejectedFriendship) {
        rejectedFriendship.status = 'pending';
        await rejectedFriendship.save();

        return {
          ok: true,
          message: 'Solicitud de amistad reenviada correctamente',
          newFriendship: rejectedFriendship,
        };
      }

      // Crear la nueva solicitud de amistad
      const newFriendship = new this.friendshipModel({
        idUser1: new mongoose.Types.ObjectId(idUser1),
        idUser2: new mongoose.Types.ObjectId(idUser2),
      });

      await newFriendship.save();
      return {
        ok: true,
        message: 'Solicitud de amistad enviada correctamente',
        newFriendship,
      };
    } catch (error) {
      // Si el error es un ConflictException, lo relanzamos directamente
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        // Capturamos errores inesperados
        throw new InternalServerErrorException(
          'Error inesperado creando la amistad: ' + error,
        );
      }
    }
  }

  /**
   * Acepta una solicitud de amistad
   * @param idUserAuth ID del usuario autenticado que acepta la solicitud
   * @param idUserFriend ID del usuario amigo que envió la solicitud
   * @returns {Promise<{ ok: boolean; message: string }>} Mensaje de éxito
   * @throws NotFoundException Si no se encuentra la solicitud de amistad pendiente
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async acceptFriendship(
    idUserAuth: string,
    idUserFriend: string,
  ): Promise<{ ok: boolean; message: string }> {
    try {
      // Buscar la amistad pendiente entre el usuario que envió la solicitud y el autenticado
      const friendship = await this.friendshipModel.findOne({
        idUser1: idUserFriend,
        idUser2: idUserAuth,
        status: 'pending',
      });

      if (!friendship) {
        throw new NotFoundException(
          'No se encontró una solicitud de amistad pendiente para aceptar' +
            idUserFriend,
        );
      }

      // Actualizar el estado a "accepted"
      friendship.status = 'accepted';
      await friendship.save();

      return {
        ok: true,
        message: 'Solicitud de amistad aceptada correctamente',
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error inesperado aceptando la solicitud de amistad: ' + error,
      );
    }
  }

  /**
   * Rechaza una solicitud de amistad
   * @param idUserAuth ID del usuario autenticado que rechaza la solicitud
   * @param idUserFriend ID del usuario amigo que envió la solicitud
   * @returns {Promise<{ ok: boolean; message: string; friendship: Friendship }>} Mensaje de éxito y la amistad actualizada
   * @throws NotFoundException Si no se encuentra la solicitud de amistad pendiente
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async rejectFriendship(
    idUserAuth: string,
    idUserFriend: string,
  ): Promise<{ ok: boolean; message: string; friendship: Friendship }> {
    try {
      // Buscar la amistad pendiente entre el usuario que envió la solicitud y el autenticado
      const friendship = await this.friendshipModel.findOne({
        idUser1: idUserFriend,
        idUser2: idUserAuth,
        status: 'pending',
      });

      if (!friendship) {
        throw new NotFoundException(
          'No se encontró una solicitud de amistad pendiente para rechazar',
        );
      }

      // Actualizar el estado a "rejected"
      friendship.status = 'rejected';
      await friendship.save();

      return {
        ok: true,
        message: 'Solicitud de amistad rechazada correctamente',
        friendship,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error inesperado rechazando la solicitud de amistad: ' + error,
      );
    }
  }

  /**
   * Busca todas las amistades aceptadas de un usuario
   * (Revisar posibilidad de devolver Promise<Friendship[]>)
   * @returns {Promise<User[]>} Lista de amistades
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async findAllFriendships(idUserAuth: string): Promise<User[]> {
    try {
      const friendships = await this.friendshipModel
        .find({
          $or: [
            { idUser1: idUserAuth, status: 'accepted' },
            { idUser2: idUserAuth, status: 'accepted' },
          ],
        })
        .populate('idUser1')
        .populate('idUser2');

      // Buscar el usuario autenticado y el usuario que recibe la solicitud
      const userAuth = await this.userModel.findById(idUserAuth);

      if (!userAuth) {
        throw new NotFoundException('No se encontró el usuario autenticado');
      }

      const friends: User[] = [];

      for (const friendship of friendships) {
        // Buscar el usuario amigo
        const user1 = await this.userModel.findById(friendship.idUser1);
        const user2 = await this.userModel.findById(friendship.idUser2);

        if (!user1 || !user2) {
          throw new NotFoundException(
            'No se encontró uno de los usuarios de la Friendship',
          );
        }

        const userFriendship = await this.userModel.findById(
          user1?.id === userAuth.id ? user2?.id : user1?.id,
        );

        if (!userFriendship) {
          throw new NotFoundException('No se encontró el usuario amigo');
        }

        friends.push(userFriendship);
      }

      return friends || [];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error inesperado buscando las amistades: ' + error,
      );
    }
  }

  /**
   * Busca todas las solicitudes de amistad pendientes recibidas por el usuario autenticado
   * @returns {Promise<User[]>} Lista de usuarios que enviaron solicitud
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async findAllRequest(idUserAuth: string): Promise<User[]> {
    try {
      // Verificar si el ID del usuario es válido
      const userAuth = await this.userModel.findById(idUserAuth);
      if (!userAuth) {
        throw new NotFoundException('No se encontró el usuario autenticado');
      }

      // Buscar amistades pendientes donde el usuario es el receptor
      const requests = await this.friendshipModel
        .find({ idUser2: idUserAuth, status: 'pending' })
        .populate('idUser1');

      // Extraer los usuarios que enviaron la solicitud
      const usersWhoSentRequest: User[] = [];

      for (const request of requests) {
        const senderUser = await this.userModel.findById(request.idUser1);
        if (!senderUser) {
          throw new NotFoundException(
            `No se encontró un usuario que envió la solicitud`,
          );
        }
        usersWhoSentRequest.push(senderUser);
      }

      return usersWhoSentRequest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error inesperado buscando las solicitudes de amistad: ' + error,
      );
    }
  }

  /**
   * Elimina una amistad por ID de usuario autenticado y ID de usuario amigo
   * Esta función elimina una amistad entre dos usuarios y las bibliotecas compartidas asociadas.
   * @param idUserAuth ID del usuario autenticado
   * @param idUserFriend ID del usuario amigo
   * @returns {Promise<{ ok: boolean; message: string }>} Mensaje de éxito
   * @throws BadRequestException Si el ID del amigo no es válido
   * @throws NotFoundException Si no se encuentra la amistad o el usuario autenticado
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async deleteFriendshipByIdFriend(
    idUserAuth: string,
    idUserFriend: string,
  ): Promise<{ ok: boolean; message: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(idUserFriend)) {
        throw new BadRequestException('ID de amigo no válido');
      }

      const userAuth = await this.userModel.findById(idUserAuth);
      if (!userAuth) {
        throw new NotFoundException('No se encontró el usuario autenticado');
      }

      const friendship = await this.friendshipModel.findOne({
        $or: [
          { idUser1: idUserAuth, idUser2: idUserFriend },
          { idUser1: idUserFriend, idUser2: idUserAuth },
        ],
      });

      if (!friendship) {
        throw new NotFoundException('No se encontró la amistad');
      }

      // Se elimina la amistad y las bibliotecas compartidas asociadas si existen
      await Promise.all([
        this.friendshipModel.findByIdAndDelete(friendship.id),
        this.sharedLibraryModel.deleteMany({
          $or: [
            { idUserOwner: idUserAuth, idUserFriend },
            { idUserOwner: idUserFriend, idUserFriend: idUserAuth },
          ],
        }),
      ]);

      return {
        ok: true,
        message: 'Amistad eliminada correctamente',
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error inesperado al eliminar la amistad',
        );
      }
    }
  }
}
