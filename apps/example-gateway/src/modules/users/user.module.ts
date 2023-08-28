import { Module } from '@joktec/core';
import { UserBlockInterceptor, UserDenyInterceptor, UserGrantInterceptor } from './hooks';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserRepo, UserService, UserGrantInterceptor, UserDenyInterceptor, UserBlockInterceptor],
  exports: [UserService],
})
export class UserModule {}
