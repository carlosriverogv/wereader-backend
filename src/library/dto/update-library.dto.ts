import { PartialType } from '@nestjs/swagger';
import { AddBookToLibraryDto } from './addbook-library.dto';

export class UpdateLibraryDto extends PartialType(AddBookToLibraryDto) {}
