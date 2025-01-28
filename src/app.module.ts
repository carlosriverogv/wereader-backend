import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BookModule, MongooseModule.forRoot('mongodb://127.0.0.1/wereader')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
