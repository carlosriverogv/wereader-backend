import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  /**
   * Login de usuario
   * @param loginDto Los datos de login
   * @description Login de usuario
   * @returns El token de autenticación
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return { ok: true, resultado: token };
  }

  /**
   * Registro de usuario
   * @param createUserDto Los datos del usuario a registrar
   * @description Registro de usuario
   * @returns El usuario
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return { ok: true, resultado: user };
  }
}
