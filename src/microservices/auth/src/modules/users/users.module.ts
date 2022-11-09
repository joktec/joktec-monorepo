import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './users.service';
import { COLLECTION_NAME } from './users.constants';
// import { UserSchema } from './users.schema';
import { UserSchema } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COLLECTION_NAME, schema: UserSchema }]),
  ],
  providers: [UserService, JwtService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
