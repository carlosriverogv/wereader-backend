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
  @MaxLength(25, { message: 'El tag no puede superar los 25 caracteres' })
  // Debe empezar por @, solo letras(minúsculas) y números y no puede tener espacios ni caracteres especiales
  @Matches(/^@[a-z0-9]+$/, {
    message:
      'Solo letras(minúsculas) y números, y no puede tener espacios ni caracteres especiales',
  })
  tag: string;

  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  name: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(100, {
    message: 'El apellido no puede superar los 100 caracteres',
  })
  lastname: string;

  @IsEnum([1, 2, 3, 4], { message: 'El avatar debe ser un número entre 1 y 4' })
  @IsNotEmpty({ message: 'El avatar es obligatorio' })
  avatar: number;

  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @MaxLength(100, { message: 'El correo no puede superar los 100 caracteres' })
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
  password: string;

  @IsString({ message: 'El género favorito debe ser un texto' })
  @IsOptional()
  genderFav?: string;

  @IsString({ message: 'El autor favorito debe ser un texto' })
  @IsOptional()
  authorFav?: string;
}
