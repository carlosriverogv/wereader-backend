import { Module } from '@nestjs/common';
import { SharedLibraryService } from './shared-library.service';
import { SharedLibraryController } from './shared-library.controller';
import { SharedLibrarySchema } from './entities/shared-library.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendshipSchema } from 'src/friendship/entities/friendship.entity';
import { LibrarySchema } from 'src/library/entities/library.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'sharedLibrary',
        schema: SharedLibrarySchema,
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
  controllers: [SharedLibraryController],
  providers: [SharedLibraryService],
})
export class SharedLibraryModule {}
