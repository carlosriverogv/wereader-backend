import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El tag debe ser un texto' })
  @IsNotEmpty({ message: 'El tag es obligatorio' })
  @MinLength(3, { message: 'El tag debe tener al menos 3 caracteres' })
  @MaxLength(15, { message: 'El tag no puede superar los 15 caracteres' })
  // Debe empezar por @, solo letras(minúsculas) y números y no puede tener espacios ni caracteres especiales
  @Matches(/^@[a-z0-9]+$/, {
    message:
      'Solo letras(minúsculas) y números, y no puede tener espacios ni caracteres especiales',
  })
  @ApiProperty({
    example: '@usuario',
    description: 'Tag del usuario',
  })
  tag: string;

  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  @ApiProperty({
    example: 'Carlos',
    description: 'Nombre del usuario',
  })
  name: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(100, {
    message: 'El apellido no puede superar los 100 caracteres',
  })
  @ApiProperty({
    example: 'Rivero',
    description: 'Apellido del usuario',
  })
  lastname: string;

  @IsEnum([1, 2, 3, 4], { message: 'El avatar debe ser un número entre 1 y 4' })
  @IsNotEmpty({ message: 'El avatar es obligatorio' })
  @ApiProperty({
    example: 1,
    description: 'Avatar del usuario',
  })
  avatar: number;

  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @MaxLength(100, { message: 'El correo no puede superar los 100 caracteres' })
  @ApiProperty({
    example: 'emailuser@gmail.com',
    description: 'Email del usuario',
  })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(60, {
    message: 'La contraseña no puede superar los 60 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un símbolo',
  })
  @ApiProperty({
    example: 'Jye3$%d2cmL&',
    description: 'Contraseña del usuario',
  })
  password: string;

  @IsString({ message: 'El género favorito debe ser un texto' })
  @IsOptional()
  @ApiProperty({
    example: 'Fantasía',
    description: 'Género favorito del usuario',
  })
  genderFav?: string;

  @IsString({ message: 'El autor favorito debe ser un texto' })
  @IsOptional()
  @ApiProperty({
    example: 'Brandon Sanderson',
    description: 'Autor favorito del usuario',
  })
  authorFav?: string;
}
