// dto/delete-shared-library.dto.ts
import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteSharedLibraryDto {
  @IsMongoId()
  @ApiProperty({
    example: '67e54493fae48085b37a28d1',
    description:
      'ID del otro usuario implicado en la relación de biblioteca compartida',
  })
  readonly idOtherUser: string;
}
