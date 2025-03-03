import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'El ISBN debe ser un texto' })
  @IsNotEmpty({ message: 'El ISBN es obligatorio' })
  readonly isbn: string;

  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  readonly title: string;

  @IsString({ message: 'El autor debe ser un texto' })
  @IsNotEmpty({ message: 'El autor es obligatorio' })
  readonly author: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'El precio debe ser un número válido' },
  )
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  readonly price: number;

  @IsString({ message: 'La url del epub debe ser un texto' })
  @IsNotEmpty({ message: 'La url del epub es obligatoria' })
  readonly epubUrl: string;

  @IsString({ message: 'La url de la portada debe ser un texto' })
  @IsOptional()
  readonly coverUrl?: string;

  @IsString({ message: 'El género debe ser un texto' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  readonly gender: string;

  @IsDateString({})
  @IsOptional()
  readonly datePublished?: Date;

  @IsString({ message: 'La sinopsis debe ser un texto' })
  @IsOptional()
  readonly synopsis?: string;

  @IsBoolean({ message: 'El campo shareable debe ser un booleano' })
  @IsNotEmpty({ message: 'El campo shareable es obligatorio' })
  readonly shareable: boolean;

  // @IsDateString({})
  // readonly dateCreation: Date;
}
