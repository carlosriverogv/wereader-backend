import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
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
          { idUser1, idUser2 },
          { idUser1: idUser2, idUser2: idUser1 },
        ],
      });
      if (existingFriendship) {
        throw new ConflictException(
          'Ya hay una relación de amistad entre estos usuarios. Ya sea pendiente, aceptada o rechazada',
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
          `No se puede aceptar esta solicitud porque ya está '${friendship.status}'`,
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

  findAll() {
    return `This action returns all friendship`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friendship`;
  }

  update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
    return `This action updates a #${id} friendship`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendship`;
  }
}
