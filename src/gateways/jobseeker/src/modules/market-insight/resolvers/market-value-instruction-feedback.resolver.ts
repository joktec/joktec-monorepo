import { firstValueFrom } from 'rxjs';
import {
  MarketValueInstructionFeedbackMessagePattern,
  MarketInsightMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateMarketValueInstructionFeedbackInput,
  UpdateMarketValueInstructionFeedbackInput,
  MarketValueInstructionFeedbackQueryInput,
  MarketValueInstructionFeedbackListReponse,
  MarketValueInstructionFeedback,
} from '@jobhopin/graphql';

const marketInsightMicroserviceConfig = new MarketInsightMicroserviceConfig();
@Resolver(() => MarketValueInstructionFeedback)
export class MarketValueInstructionFeedbackResolver extends BaseResolver<
  CreateMarketValueInstructionFeedbackInput,
  UpdateMarketValueInstructionFeedbackInput,
  MarketValueInstructionFeedbackQueryInput
>({
  viewDto: MarketValueInstructionFeedback,
  createInput: CreateMarketValueInstructionFeedbackInput,
  updateInput: UpdateMarketValueInstructionFeedbackInput,
  listQueryInput: MarketValueInstructionFeedbackQueryInput,
  listViewDto: MarketValueInstructionFeedbackListReponse,
  name: 'marketValueInstructionFeedback',
  pluralName: 'marketValueInstructionFeedbacks',
}) {
  constructor(
    @Inject(marketInsightMicroserviceConfig.name)
    private readonly marketInsightMicroservice: ClientProxy,
  ) {
    super(marketInsightMicroservice, MarketValueInstructionFeedbackMessagePattern);
  }
}
