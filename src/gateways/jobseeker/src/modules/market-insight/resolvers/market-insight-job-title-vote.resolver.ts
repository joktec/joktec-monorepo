import { firstValueFrom } from 'rxjs';
import {
  MarketInsightJobTitleVoteMessagePattern,
  MarketInsightMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateMarketInsightJobTitleVoteInput,
  UpdateMarketInsightJobTitleVoteInput,
  MarketInsightJobTitleVoteQueryInput,
  MarketInsightJobTitleVoteListReponse,
  MarketInsightJobTitleVote,
} from '@jobhopin/graphql';

const marketInsightMicroserviceConfig = new MarketInsightMicroserviceConfig();
@Resolver(() => MarketInsightJobTitleVote)
export class MarketInsightJobTitleVoteResolver extends BaseResolver<
  CreateMarketInsightJobTitleVoteInput,
  UpdateMarketInsightJobTitleVoteInput,
  MarketInsightJobTitleVoteQueryInput
>({
  viewDto: MarketInsightJobTitleVote,
  createInput: CreateMarketInsightJobTitleVoteInput,
  updateInput: UpdateMarketInsightJobTitleVoteInput,
  listQueryInput: MarketInsightJobTitleVoteQueryInput,
  listViewDto: MarketInsightJobTitleVoteListReponse,
  name: 'marketInsightJobTitleVote',
  pluralName: 'marketInsightJobTitleVotes',
}) {
  constructor(
    @Inject(marketInsightMicroserviceConfig.name)
    private readonly marketInsightMicroservice: ClientProxy,
  ) {
    super(marketInsightMicroservice, MarketInsightJobTitleVoteMessagePattern);
  }
}
