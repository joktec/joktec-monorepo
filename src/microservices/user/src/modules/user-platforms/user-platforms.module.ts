import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPlatformService } from './user-platforms.service';
import { UserPlatformController } from './user-platforms.controller';
import {
  UserPlatform,
  UserPlatformSchema,
} from './schemas/user-platforms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPlatform.name, schema: UserPlatformSchema },
    ]),
  ],
  providers: [UserPlatformService],
  controllers: [UserPlatformController],
  exports: [UserPlatformService],
})
export class UserPlatformModule {}
