import { PartialType } from '@nestjs/swagger';
import { CreateSharedLibraryDto } from './create-shared-library.dto';

export class UpdateSharedLibraryDto extends PartialType(CreateSharedLibraryDto) {}
