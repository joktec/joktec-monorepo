

import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CommonMicroserviceConfig } from '@jobhopin/core';

import { MarketingSeoKeywordController } from './controllers/marketing-seo-keyword.controller';
import { MarketingSeoKeywordResolver } from './resolvers';

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
  providers: [MarketingSeoKeywordResolver],
  controllers: [MarketingSeoKeywordController],
  exports: []
})

export class MarketingSeoKeywordModule {}
