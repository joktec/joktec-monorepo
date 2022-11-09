import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { EmailModule } from '@jobhopin/core';
import { forwardRef } from '@nestjs/common';
import { UserModule, UserEmailVerificationModule } from '@app/modules';

@Module({
  imports: [
    EmailModule,
    forwardRef(() => UserModule),
    forwardRef(() => UserEmailVerificationModule),
  ],
  providers: [],
  controllers: [AuthController],
  exports: []
})

export class AuthModule {};
