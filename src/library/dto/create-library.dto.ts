import mongoose from 'mongoose';
import { IsMongoId, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLibraryDto {
  @IsMongoId()
  @ApiProperty({
    example: '67e54453fae48085b37a28ce',
    description: 'ID del dueño de la biblioteca',
  })
  readonly idUser: mongoose.Schema.Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true }) // Valida que cada elemento sea un ObjectId válido
  @IsOptional()
  @ApiProperty({
    example: '["67c74e8be06e6877612e7b35", "67c74e8be06e6877612e7b36"]',
    description: 'IDs de los libros de la biblioteca',
  })
  readonly books?: mongoose.Schema.Types.ObjectId[] = [];
}
