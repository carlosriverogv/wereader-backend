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

@Injectable()
export class FriendshipService {
  constructor(
    @InjectModel('friendship')
    private readonly friendshipModel: Model<Friendship>,
    @InjectModel('user')
    private readonly userModel: Model<User>,
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
      const idUser2 = createFriendshipDto.idUser2;

      // Comprobar que no se envia amistad con el mismo usuario
      if (idUser1 === idUser2) {
        throw new BadRequestException(
          'No puedes enviarte una solicitud a ti mismo',
        );
      }

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
   * @param idFriendship ID de la amistad a aceptar
   * @returns {Promise<{ ok: boolean; message: string; friendship: Friendship }>} La amistad aceptada
   * @throws NotFoundException Si no se encuentra la amistad
   * @throws ConflictException Si la amistad ya ha sido aceptada o rechazada
   */
  async acceptFriendship(
    idFriendship: string,
    idUserAuth: string,
  ): Promise<{ ok: boolean; message: string; friendship: Friendship }> {
    try {
      // Buscar la amistad por ID
      const friendship = await this.friendshipModel.findById(idFriendship);

      if (!friendship) {
        throw new NotFoundException('No se encontró la amistad');
      }

      // Buscar el usuario autenticado y el usuario que recibe la solicitud
      const userAuth = await this.userModel.findById(idUserAuth);
      const userFriendship = await this.userModel.findById(friendship.idUser2);

      if (!userAuth || !userFriendship) {
        throw new NotFoundException('No se encontró el usuario autenticado');
      }

      // Comprobar que el usuario autenticado es el que recibe la solicitud
      if (userAuth.id !== userFriendship.id) {
        throw new ConflictException(
          'El usuario autenticado no es el que recibe la solicitud de amistad',
        );
      }

      // Verificar si la solicitud ya ha sido aceptada o rechazada
      if (friendship.status !== 'pending') {
        throw new ConflictException(
          `No se puede aceptar esta solicitud porque ya está '${friendship.status}'`,
        );
      }

      // Actualizar el estado a "accepted"
      friendship.status = 'accepted';
      await friendship.save();

      return {
        ok: true,
        message: 'Solicitud de amistad aceptada correctamente',
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
        'Error inesperado aceptando la amistad: ' + error,
      );
    }
  }

  /**
   * Rechaza una solicitud de amistad
   * @param idFriendship ID de la amistad a rechazar
   * @returns {Promise<{ ok: boolean; message: string; friendship: Friendship }>} La amistad rechazada
   * @throws NotFoundException Si no se encuentra la amistad
   * @throws ConflictException Si la amistad ya ha sido aceptada o rechazada
   */
  async rejectFriendship(
    idFriendship: string,
    idUserAuth: string,
  ): Promise<{ ok: boolean; message: string; friendship: Friendship }> {
    try {
      // Buscar la amistad por ID
      const friendship = await this.friendshipModel.findById(idFriendship);

      if (!friendship) {
        throw new NotFoundException('No se encontró la amistad');
      }

      // Buscar el usuario autenticado y el usuario que recibe la solicitud
      const userAuth = await this.userModel.findById(idUserAuth);
      const userFriendship = await this.userModel.findById(friendship.idUser2);

      if (!userAuth || !userFriendship) {
        throw new NotFoundException('No se encontró el usuario autenticado');
      }

      // Comprobar que el usuario autenticado es el que recibe la solicitud
      if (userAuth.id !== userFriendship.id) {
        throw new ConflictException(
          'El usuario autenticado no es el que recibe la solicitud de amistad',
        );
      }

      // Verificar si la solicitud ya ha sido aceptada o rechazada
      if (friendship.status !== 'pending') {
        throw new ConflictException(
          `No se puede rechazar esta solicitud porque ya está '${friendship.status}'`,
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
        'Error inesperado rechazando la amistad: ' + error,
      );
    }
  }

  /**
   * Elimina una amistad (PROVISIONAL)
   * @param idFriendship ID de la amistad a eliminar
   * @returns {Promise<{ ok: boolean; message: string }>} Mensaje de éxito
   * @throws NotFoundException Si no se encuentra la amistad
   */
  async deleteFriendship(
    idFriendship: string,
    idUserAuth: string,
  ): Promise<{ ok: boolean; message: string }> {
    try {
      // Buscar el usuario autenticado
      const userAuth = await this.userModel.findById(idUserAuth);

      if (!userAuth) {
        throw new NotFoundException('No se encontró el usuario autenticado');
      }

      // Comprobar que el usuario autenticado es uno de los dos usuarios de la amistad
      const friendship = await this.friendshipModel.findOne({
        _id: idFriendship,
        $or: [{ idUser1: userAuth.id }, { idUser2: userAuth.id }],
      });

      if (!friendship) {
        throw new BadRequestException(
          'No puedes eliminar esta amistad porque no eres parte de ella',
        );
      }

      // Eliminar la amistad
      await this.friendshipModel.findByIdAndDelete(idFriendship);
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
          'Error inesperado eliminando la amistad: ' + error,
        );
      }
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

      return friends;
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
   * Busca todas las amistades pendientes de un usuario
   * @returns {Promise<Friendship[]>} Lista de amistades
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async findAllRequest(idUserAuth: string): Promise<Friendship[]> {
    try {
      const requests = await this.friendshipModel
        .find({
          $or: [{ idUser2: idUserAuth, status: 'pending' }],
        })
        .populate('idUser1');

      return requests;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error inesperado buscando las amistades: ' + error,
      );
    }
  }
}
