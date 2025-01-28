import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { isValid as isValidISBN } from 'isbn-utils';

export class CreateBookDto {
  @IsString({ message: 'El ISBN debe ser un texto' })
  @IsNotEmpty({ message: 'El ISBN es obligatorio' })
  @Validate(isValidISBN, {
    message: 'El ISBN no es válido',
  })
  readonly isbn: string;
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  readonly title: string;
  @IsString({ message: 'El autor debe ser un texto' })
  @IsNotEmpty({ message: 'El autor es obligatorio' })
  readonly author: string;
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  readonly price: number;
  @IsString({ message: 'La url del epub debe ser un texto' })
  @IsNotEmpty({ message: 'La url del epub es obligatoria' })
  readonly epubUrl: string;
  @IsString({ message: 'La url de la portada debe ser un texto' })
  readonly coverUrl: string;
  @IsString({ message: 'El género debe ser un texto' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  readonly gender: string;
  @IsDate({ message: 'La fecha de publicación debe ser una fecha válida' })
  readonly datePublished: Date;
  @IsString({ message: 'La sinopsis debe ser un texto' })
  readonly synopsis: string;
  @IsBoolean({ message: 'El campo shareable debe ser un booleano' })
  @IsNotEmpty({ message: 'El campo shareable es obligatorio' })
  readonly shareable: boolean;
  @IsDate({ message: 'La fecha de creación debe ser una fecha válida' })
  readonly dateCreation: Date;
}
