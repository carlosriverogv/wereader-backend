import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { FriendshipSchema } from './entities/friendship.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';
import { SharedLibrarySchema } from 'src/shared-library/entities/shared-library.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'friendship',
        schema: FriendshipSchema,
      },
      {
        name: 'user',
        schema: UserSchema,
      },
      {
        name: 'sharedLibrary',
        schema: SharedLibrarySchema,
      },
    ]),
  ],
  controllers: [FriendshipController],
  providers: [FriendshipService],
})
export class FriendshipModule {}
