import {
  MarketingBanner,
  MarketingBannerSchema,
} from './schemas/marketing-banner.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MarketingBannerService } from './marketing-banner.service';
import { MarketingBannerController } from './marketing-banner.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MarketingBanner.name,
        schema: MarketingBannerSchema,
      },
    ]),
  ],
  controllers: [MarketingBannerController],
  providers: [MarketingBannerService],
})
export class MarketingBannerModule {}
