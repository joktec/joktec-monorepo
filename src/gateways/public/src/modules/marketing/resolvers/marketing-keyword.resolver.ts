import { firstValueFrom } from 'rxjs';
import {
  JSMarketingKeywordMessagePattern,
  MarketingMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateMarketingKeywordInput,
  UpdateMarketingKeywordInput,
  MarketingKeywordQueryInput,
  MarketingKeywordListReponse,
  MarketingKeyword,
} from '@jobhopin/graphql';

const marketingMicroserviceConfig = new MarketingMicroserviceConfig();
@Resolver(() => MarketingKeyword)
export class MarketingKeywordResolver extends BaseResolver<
  CreateMarketingKeywordInput,
  UpdateMarketingKeywordInput,
  MarketingKeywordQueryInput
>({
  viewDto: MarketingKeyword,
  createInput: CreateMarketingKeywordInput,
  updateInput: UpdateMarketingKeywordInput,
  listQueryInput: MarketingKeywordQueryInput,
  listViewDto: MarketingKeywordListReponse,
  name: 'marketingKeyword',
  pluralName: 'marketingKeywords',
}) {
  constructor(
    @Inject(marketingMicroserviceConfig.name)
    private readonly marketingMicroservice: ClientProxy,
  ) {
    super(marketingMicroservice, JSMarketingKeywordMessagePattern);
  }
}
