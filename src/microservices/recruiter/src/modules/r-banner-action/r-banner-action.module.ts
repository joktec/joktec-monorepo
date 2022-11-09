import {
  RBannerAction,
  RBannerActionSchema,
} from './schemas/r-banner-action.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RBannerActionService } from './r-banner-action.service';
import { RBannerActionController } from './r-banner-action.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RBannerAction.name, schema: RBannerActionSchema },
    ]),
  ],
  controllers: [RBannerActionController],
  providers: [RBannerActionService],
})
export class RBannerActionModule {}
