

import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CommonMicroserviceConfig } from '@jobhopin/core';

import { MarketingKeywordController } from './controllers/marketing-keyword.controller';
import { MarketingKeywordResolver } from './resolvers';

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
  providers: [MarketingKeywordResolver],
  controllers: [MarketingKeywordController],
  exports: []
})

export class MarketingKeywordModule {}
