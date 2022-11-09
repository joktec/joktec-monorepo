import { CommonMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { LocationResolver } from './location.resolver';

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
  providers: [LocationResolver],
  controllers: [],
  exports: [],
})
export class LocationModule {}
