import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '978-84-204-7154-9',
    description: 'ISBN del libro',
  })
  readonly isbn: string;

  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @ApiProperty({
    example: 'La historia interminable',
    description: 'Título del libro',
  })
  readonly title: string;

  @IsString({ message: 'El autor debe ser un texto' })
  @IsNotEmpty({ message: 'El autor es obligatorio' })
  @ApiProperty({
    example: 'Michael Ende',
    description: 'Autor del libro',
  })
  readonly author: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'El precio debe ser un número válido' },
  )
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @ApiProperty({
    example: '19.95',
    description: 'Precio del libro',
  })
  readonly price: number;

  @IsString({ message: 'La url del epub debe ser un texto' })
  @IsNotEmpty({ message: 'La url del epub es obligatoria' })
  @ApiProperty({
    example: 'epubs/',
    description: 'URL del epub del libro',
  })
  readonly epubUrl: string;

  @IsString({ message: 'La url de la portada debe ser un texto' })
  @IsOptional()
  @ApiProperty({
    example: 'covers/',
    description: 'URL de la portada del libro',
  })
  readonly coverUrl?: string;

  @IsString({ message: 'El género debe ser un texto' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  @ApiProperty({
    example: 'Fantasía',
    description: 'Género del libro',
  })
  readonly genre: string;

  @IsDateString({})
  @IsOptional()
  @ApiProperty({
    example: '1983-09-01',
    description: 'Fecha de publicación del libro',
  })
  readonly datePublished?: Date;

  @IsString({ message: 'La sinopsis debe ser un texto' })
  @IsOptional()
  @ApiProperty({
    example: 'La historia de Bastian Baltasar Bux',
    description: 'Sinopsis del libro',
  })
  readonly synopsis?: string;

  @IsBoolean({ message: 'El campo shareable debe ser un booleano' })
  @IsNotEmpty({ message: 'El campo shareable es obligatorio' })
  @ApiProperty({
    example: 'true',
    description:
      'Indica si el libro se puede incluir en la biblioteca compartida',
  })
  readonly shareable: boolean;
}
