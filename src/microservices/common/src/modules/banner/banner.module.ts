import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { BannerSchema } from './schemas/banner.schema';
import { NAME } from './banner.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: BannerSchema }]),
  ],
  providers: [BannerService],
  controllers: [BannerController],
  exports: [BannerService],
})

export class BannerModule {}
