import { AuthMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { AuthController } from './auth.controller';
import { AuthResolver } from './resolvers/auth.resolver';

const authMicroserviceConfig = new AuthMicroserviceConfig();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: authMicroserviceConfig.name,
        ...authMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [AuthResolver],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
