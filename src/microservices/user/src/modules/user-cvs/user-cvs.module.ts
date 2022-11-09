import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserCvService } from './user-cvs.service';
import { UserCvController } from './user-cvs.controller';
import { UserCv, UserCvSchema } from './schemas/user-cvs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserCv.name, schema: UserCvSchema }]),
  ],
  providers: [UserCvService],
  controllers: [UserCvController],
  exports: [UserCvService],
})
export class UserCvModule {}
