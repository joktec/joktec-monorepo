import { MarketInsightMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MarketInsightJobTitleVoteResolver } from './resolvers/market-insight-job-title-vote.resolver';
import { MarketInsightJobTitleResolver } from './resolvers/market-insight-job-title.resolver';
import { MarketValueInstructionFeedbackResolver } from './resolvers/market-value-instruction-feedback.resolver';

const marketInsightMicroserviceConfig = new MarketInsightMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: marketInsightMicroserviceConfig.name,
        ...marketInsightMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],

  providers: [
    MarketInsightJobTitleVoteResolver,
    MarketInsightJobTitleResolver,
    MarketValueInstructionFeedbackResolver
  ],
  controllers: [],
})
export class MarketInsightModule { }
