

import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CommonMicroserviceConfig } from '@jobhopin/core';

import { IndustryController } from './controllers/industry.controller';
import { IndustryResolver } from './resolvers';

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
  providers: [IndustryResolver],
  controllers: [IndustryController],
  exports: []
})

export class IndustryModule {}
