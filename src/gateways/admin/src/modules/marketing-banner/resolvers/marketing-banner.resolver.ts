import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  MarketingBannerMessagePattern,
  CommonMicroserviceConfig,
  snakeToCamel,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateMarketingBannerInput,
  UpdateMarketingBannerInput,
  MarketingBannerQueryInput,
} from '../inputs';
import { MarketingBannerTypedef, MarketingBannerListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../marketing-banner.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => MarketingBannerTypedef)
export class MarketingBannerResolver extends BaseResolver<
  CreateMarketingBannerInput,
  UpdateMarketingBannerInput,
  MarketingBannerQueryInput
>({
  viewDto: MarketingBannerTypedef,
  createInput: CreateMarketingBannerInput,
  updateInput: UpdateMarketingBannerInput,
  listQueryInput: MarketingBannerQueryInput,
  listViewDto: MarketingBannerListResponseTypedef,
  name: snakeToCamel(NAME),
  pluralName: snakeToCamel(PLURAL_NAME),
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly marketingBannerMicroservice: ClientProxy,
  ) {
    super(marketingBannerMicroservice, MarketingBannerMessagePattern);
  }
}
