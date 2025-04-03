import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LibrarySchema } from './entities/library.entity';
import { BookSchema } from 'src/book/entities/book.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'library',
        schema: LibrarySchema,
      },
      {
        name: 'book',
        schema: BookSchema,
      },
    ]),
    BookModule,
  ],
  controllers: [LibraryController],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
