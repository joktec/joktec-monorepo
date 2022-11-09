import { MarketingMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MarketingBannerResolver } from './resolvers/marketing-banner.resolver';
import { MarketingKeywordResolver } from './resolvers/marketing-keyword.resolver';
import { MarketingSeoKeywordResolver } from './resolvers/marketing-seo-keyword.resolver';

const marketingMicroserviceConfig = new MarketingMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: marketingMicroserviceConfig.name,
        ...marketingMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],

  providers: [
    MarketingBannerResolver,
    MarketingKeywordResolver,
    MarketingSeoKeywordResolver,
  ],
  controllers: [],
})
export class MarketingModule {}
