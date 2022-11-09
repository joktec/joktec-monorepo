import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { HealthModule } from '@jobhopin/core';

import { ConfigModule } from '@nestjs/config';

import {
  UserModule,
  AuthModule,
  UserEmailVerificationModule,
} from '@app/modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    UserModule,
    AuthModule,
    UserEmailVerificationModule,
    MongooseModule.forRoot(process.env.AUTH_SERVICE_MONGODB_URL),
    JwtModule.register({
      secret: Buffer.from(`${process.env.JWT_TOKEN_SECRET}`, 'base64'),
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
