

import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CommonMicroserviceConfig } from '@jobhopin/core';

import { MarketingBannerController } from './controllers/marketing-banner.controller';
import { MarketingBannerResolver } from './resolvers';

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
  providers: [MarketingBannerResolver],
  controllers: [MarketingBannerController],
  exports: []
})

export class MarketingBannerModule {}
