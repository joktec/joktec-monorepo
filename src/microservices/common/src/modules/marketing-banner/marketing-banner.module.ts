import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingBannerService } from './marketing-banner.service';
import { MarketingBannerController } from './marketing-banner.controller';
import { MarketingBannerSchema } from './schemas/marketing-banner.schema';
import { NAME } from './marketing-banner.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: MarketingBannerSchema }]),
  ],
  providers: [MarketingBannerService],
  controllers: [MarketingBannerController],
  exports: [MarketingBannerService],
})

export class MarketingBannerModule {}
