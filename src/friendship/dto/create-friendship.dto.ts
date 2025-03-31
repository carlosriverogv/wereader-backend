import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateFriendshipDto {
  @IsMongoId()
  @ApiProperty({
    example: '67e54493fae48085b37a28d1',
    description: 'ID del usuario que va a recibir la solicitud de amistad',
  })
  readonly idUser2: string; // ID del usuario al que se le envía la solicitud de amistad
}
