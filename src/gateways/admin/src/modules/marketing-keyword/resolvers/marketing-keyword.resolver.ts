import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  MarketingKeywordMessagePattern,
  CommonMicroserviceConfig,
  snakeToCamel,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateMarketingKeywordInput,
  UpdateMarketingKeywordInput,
  MarketingKeywordQueryInput,
} from '../inputs';
import { MarketingKeywordTypedef, MarketingKeywordListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../marketing-keyword.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => MarketingKeywordTypedef)
export class MarketingKeywordResolver extends BaseResolver<
  CreateMarketingKeywordInput,
  UpdateMarketingKeywordInput,
  MarketingKeywordQueryInput
>({
  viewDto: MarketingKeywordTypedef,
  createInput: CreateMarketingKeywordInput,
  updateInput: UpdateMarketingKeywordInput,
  listQueryInput: MarketingKeywordQueryInput,
  listViewDto: MarketingKeywordListResponseTypedef,
  name: snakeToCamel(NAME),
  pluralName: snakeToCamel(PLURAL_NAME),
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly marketingKeywordMicroservice: ClientProxy,
  ) {
    super(marketingKeywordMicroservice, MarketingKeywordMessagePattern);
  }
}
