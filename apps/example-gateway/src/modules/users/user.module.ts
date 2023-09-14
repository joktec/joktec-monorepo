import { Module } from '@joktec/core';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserRepo, UserService],
  exports: [UserService],
})
export class UserModule {}
