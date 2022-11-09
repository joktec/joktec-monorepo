import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  MarketingSeoKeywordMessagePattern,
  CommonMicroserviceConfig,
  snakeToCamel,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateMarketingSeoKeywordInput,
  UpdateMarketingSeoKeywordInput,
  MarketingSeoKeywordQueryInput,
} from '../inputs';
import { MarketingSeoKeywordTypedef, MarketingSeoKeywordListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../marketing-seo-keyword.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => MarketingSeoKeywordTypedef)
export class MarketingSeoKeywordResolver extends BaseResolver<
  CreateMarketingSeoKeywordInput,
  UpdateMarketingSeoKeywordInput,
  MarketingSeoKeywordQueryInput
>({
  viewDto: MarketingSeoKeywordTypedef,
  createInput: CreateMarketingSeoKeywordInput,
  updateInput: UpdateMarketingSeoKeywordInput,
  listQueryInput: MarketingSeoKeywordQueryInput,
  listViewDto: MarketingSeoKeywordListResponseTypedef,
  name: snakeToCamel(NAME),
  pluralName: snakeToCamel(PLURAL_NAME),
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly marketingSeoKeywordMicroservice: ClientProxy,
  ) {
    super(marketingSeoKeywordMicroservice, MarketingSeoKeywordMessagePattern);
  }
}
