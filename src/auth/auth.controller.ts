import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@ApiBearerAuth()
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
  @ApiOperation({ summary: 'Iniciar sesión' })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return {
      success: true,
      message: 'Inicio de sesión exitoso',
      token: result.token, // Token JWT generado
    };
  }

  /**
   * Registro de usuario
   * @param createUserDto Los datos del usuario a registrar
   * @description Registro de usuario
   * @returns El usuario
   */
  //@UseGuards(AuthGuard)
  @Post('register')
  @ApiOperation({ summary: 'Registrar un usuario (con biblioteca)' })
  async register(@Body() createUserDto: CreateUserDto) {
    // Crear el usuario
    const user = await this.userService.create(createUserDto);
    return {
      success: true,
      message: 'Registro de usuario exitoso',
      user,
    };
  }
}
