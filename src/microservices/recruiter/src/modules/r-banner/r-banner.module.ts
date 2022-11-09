import { RBanner, RBannerSchema } from './schemas/r-banner.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RBannerService } from './r-banner.service';
import { RBannerController } from './r-banner.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RBanner.name, schema: RBannerSchema }]),
  ],
  controllers: [RBannerController],
  providers: [RBannerService],
})
export class RBannerModule {}
