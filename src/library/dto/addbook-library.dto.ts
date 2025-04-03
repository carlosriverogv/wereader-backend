import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBookToLibraryDto {
  @IsMongoId()
  @ApiProperty({
    example: '67c74e8be06e6877612e7b35',
    description: 'ID del libro que se va a añadir a la biblioteca',
  })
  readonly bookId: string;
}
