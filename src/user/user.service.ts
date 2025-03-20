import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly userModel: Model<User>,
  ) {}

  /**
   * Busca un usuario por su email y password
   * @param email El email del usuario buscado
   * @param password La contraseña del usuario buscado
   * @description Busca un usuario por su email y password
   * @returns El usuario en caso de encontrarlo, undefined en caso contrario
   */
  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    try {
      // Buscar el usuario por email e incluir la contraseña
      const user = await this.userModel
        .findOne({ email })
        .select('+password') // Necesario porque password tiene select: false en el modelo
        .exec();

      if (!user || typeof user.password !== 'string') return undefined;

      // Comparar la contraseña con el hash almacenado
      const isMatch: boolean = await bcrypt.compare(password, user.password);

      return isMatch ? user : undefined;
    } catch (error) {
      console.error('Error al comparar contraseñas:', error);
      return undefined;
    }
  }

  /**
   * Servicio de creación de nuevos usuarios
   * @param createUserDto - Datos del usuario a insertar
   * @description Servicio de creación de nuevos usuarios
   * @returns {Promise<{ ok: boolean; resultado: User }>} - Usuario insertado
   * @throws ConflictException - Si el usuario ya existe
   * @throws InternalServerErrorException - Si ocurre un error inesperado
   */
  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ ok: boolean; resultado: User }> {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await this.userModel
        .findOne({
          email: createUserDto.email,
        })
        .exec();

      // Si el usuario ya existe, lanzamos una excepción de conflicto
      if (existingUser) {
        throw new ConflictException(
          `El usuario con email '${createUserDto.email}' ya existe.`,
        );
      }

      // Encriptar la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      createUserDto.password = hashedPassword;

      // Si el usuario no existe, lo creamos
      const newUser = new this.userModel(createUserDto);

      // Guardamos el usuario en la base de datos
      await newUser.save();

      return { ok: true, resultado: newUser };
    } catch (error: any) {
      // Si el error es un ConflictException, lo relanzamos directamente
      if (error instanceof ConflictException) {
        throw error;
      } else {
        // Capturamos errores inesperados
        throw new InternalServerErrorException(
          'Error inesperado creando el usuario: ' + error,
        );
      }
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByTag(tag: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ tag }).exec();
      if (!user) {
        throw new NotFoundException(`El usuario con tag '${tag}' no existe.`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(
          'Error inesperado buscando el usuario: ' + error,
        );
      }
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
