import { firstValueFrom } from 'rxjs';
import {
  JSMarketingSeoKeywordMessagePattern,
  MarketingMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateMarketingSeoKeywordInput,
  UpdateMarketingSeoKeywordInput,
  MarketingSeoKeywordQueryInput,
  MarketingSeoKeywordListReponse,
  MarketingSeoKeyword,
} from '@jobhopin/graphql';

const marketingMicroserviceConfig = new MarketingMicroserviceConfig();
@Resolver(() => MarketingSeoKeyword)
export class MarketingSeoKeywordResolver extends BaseResolver<
  CreateMarketingSeoKeywordInput,
  UpdateMarketingSeoKeywordInput,
  MarketingSeoKeywordQueryInput
>({
  viewDto: MarketingSeoKeyword,
  createInput: CreateMarketingSeoKeywordInput,
  updateInput: UpdateMarketingSeoKeywordInput,
  listQueryInput: MarketingSeoKeywordQueryInput,
  listViewDto: MarketingSeoKeywordListReponse,
  name: 'marketingSeoKeyword',
  pluralName: 'marketingSeoKeywords',
}) {
  constructor(
    @Inject(marketingMicroserviceConfig.name)
    private readonly marketingMicroservice: ClientProxy,
  ) {
    super(marketingMicroservice, JSMarketingSeoKeywordMessagePattern);
  }
}
