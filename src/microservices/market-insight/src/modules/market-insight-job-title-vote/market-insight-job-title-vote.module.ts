import {
  MarketInsightJobTitleVote,
  MarketInsightJobTitleVoteSchema,
} from './schemas/market-insight-job-title-vote.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MarketInsightJobTitleVoteService } from './market-insight-job-title-vote.service';
import { MarketInsightJobTitleVoteController } from './market-insight-job-title-vote.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MarketInsightJobTitleVote.name,
        schema: MarketInsightJobTitleVoteSchema,
      },
    ]),
  ],
  controllers: [MarketInsightJobTitleVoteController],
  providers: [MarketInsightJobTitleVoteService],
})
export class MarketInsightJobTitleVoteModule {}
