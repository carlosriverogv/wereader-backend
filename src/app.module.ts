import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LibraryModule } from './library/library.module';
import { FriendshipModule } from './friendship/friendship.module';
import { SharedLibraryModule } from './shared-library/shared-library.module';

@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/wereader'),
    UserModule,
    AuthModule,
    LibraryModule,
    FriendshipModule,
    SharedLibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
