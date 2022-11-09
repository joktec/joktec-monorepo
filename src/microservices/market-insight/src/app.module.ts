import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketInsightJobTitleModule } from './modules/market-insight-job-title/market-insight-job-title.module';
import { MarketInsightJobTitleVoteModule } from './modules/market-insight-job-title-vote/market-insight-job-title-vote.module';
import { MarketValueInstructionFeedbackModule } from './modules/market-value-instruction-feedback/market-value-instruction-feedback.module';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.MARKET_INSIGHT_SERVICE_MONGODB_URL),
    HealthModule,
    MarketInsightJobTitleModule,
    MarketInsightJobTitleVoteModule,
    MarketValueInstructionFeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
