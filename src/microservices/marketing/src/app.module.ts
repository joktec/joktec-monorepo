import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketingBannerModule } from './modules/marketing-banner/marketing-banner.module';
import { MarketingKeywordModule } from './modules/marketing-keyword/marketing-keyword.module';
import { MarketingSeoKeywordModule } from './modules/marketing-seo-keyword/marketing-seo-keyword.module';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.MARKETING_SERVICE_MONGODB_URL),
    HealthModule,
    MarketingBannerModule,
    MarketingKeywordModule,
    MarketingSeoKeywordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
