import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeleteFriendshipDto {
  @IsMongoId()
  @ApiProperty({
    example: '67e54493fae48085b37a28d1',
    description:
      'ID del usuario amigo con el que se quiere eliminar la amistad',
  })
  readonly idFriendUser: string; // ID del usuario al que se le envía la solicitud de amistad
}
