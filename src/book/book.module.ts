import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './entities/book.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'book',
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
