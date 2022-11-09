import {
  MarketInsightJobTitle,
  MarketInsightJobTitleSchema,
} from './schemas/market-insight-job-title.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MarketInsightJobTitleService } from './market-insight-job-title.service';
import { MarketInsightJobTitleController } from './market-insight-job-title.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MarketInsightJobTitle.name,
        schema: MarketInsightJobTitleSchema,
      },
    ]),
  ],
  controllers: [MarketInsightJobTitleController],
  providers: [MarketInsightJobTitleService],
})
export class MarketInsightJobTitleModule {}
