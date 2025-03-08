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
  @MaxLength(50, {
    message: 'La contraseña no puede superar los 50 caracteres',
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
