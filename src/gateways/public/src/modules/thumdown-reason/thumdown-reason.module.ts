import { CommonMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ThumbdownReasonResolver } from './thumdown-reason.resolver';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: commonMicroserviceConfig.name,
        ...commonMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [ThumbdownReasonResolver],
  controllers: [],
  exports: [],
})
export class ThumbdownReasonModule {}
