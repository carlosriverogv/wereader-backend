import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { LibrarySchema } from 'src/library/entities/library.entity';
import { FriendshipSchema } from 'src/friendship/entities/friendship.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
      {
        name: 'library',
        schema: LibrarySchema,
      },
      {
        name: 'friendship',
        schema: FriendshipSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
