import { firstValueFrom } from 'rxjs';
import {
  MarketInsightJobTitleMessagePattern,
  MarketInsightMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateMarketInsightJobTitleInput,
  UpdateMarketInsightJobTitleInput,
  MarketInsightJobTitleQueryInput,
  MarketInsightJobTitleListReponse,
  MarketInsightJobTitle,
} from '@jobhopin/graphql';

const marketInsightMicroserviceConfig = new MarketInsightMicroserviceConfig();
@Resolver(() => MarketInsightJobTitle)
export class MarketInsightJobTitleResolver extends BaseResolver<
  CreateMarketInsightJobTitleInput,
  UpdateMarketInsightJobTitleInput,
  MarketInsightJobTitleQueryInput
>({
  viewDto: MarketInsightJobTitle,
  createInput: CreateMarketInsightJobTitleInput,
  updateInput: UpdateMarketInsightJobTitleInput,
  listQueryInput: MarketInsightJobTitleQueryInput,
  listViewDto: MarketInsightJobTitleListReponse,
  name: 'marketInsightJobTitle',
  pluralName: 'marketInsightJobTitles',
}) {
  constructor(
    @Inject(marketInsightMicroserviceConfig.name)
    private readonly marketInsightMicroservice: ClientProxy,
  ) {
    super(marketInsightMicroservice, MarketInsightJobTitleMessagePattern);
  }
}
