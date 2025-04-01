import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateSharedLibraryDto {
  @IsMongoId()
  @ApiProperty({
    example: '67e54493fae48085b37a28d1',
    description:
      'ID del usuario que va a recibir la el prestado de la biblioteca compartida',
  })
  readonly idUserFriend: string; // ID del usuario al que se le comparte la biblioteca
}
