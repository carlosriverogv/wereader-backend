import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida un usuario por su email y password (Login)
   * @param email El email del usuario
   * @param password La contraseña del usuario
   * @description Valida un usuario por su email y password (Login)
   * @returns El usuario en caso de encontrarlo, UnauthorizedException en caso contrario
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    const user = await this.userService.findByEmailAndPassword(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { email: user.email, sub: String(user._id) };
    // Generamos un token con el login (email) del usuario
    const token: string = await this.jwtService.signAsync(payload);
    return { token };
  }
}
