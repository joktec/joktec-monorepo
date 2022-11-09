import { firstValueFrom } from 'rxjs';
import {
  JSMarketingBannerMessagePattern,
  MarketingMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateMarketingBannerInput,
  UpdateMarketingBannerInput,
  MarketingBannerQueryInput,
  MarketingBannerListReponse,
  MarketingBanner,
} from '@jobhopin/graphql';

const marketingMicroserviceConfig = new MarketingMicroserviceConfig();
@Resolver(() => MarketingBanner)
export class MarketingBannerResolver extends BaseResolver<
  CreateMarketingBannerInput,
  UpdateMarketingBannerInput,
  MarketingBannerQueryInput
>({
  viewDto: MarketingBanner,
  createInput: CreateMarketingBannerInput,
  updateInput: UpdateMarketingBannerInput,
  listQueryInput: MarketingBannerQueryInput,
  listViewDto: MarketingBannerListReponse,
  name: 'marketingBanner',
  pluralName: 'marketingBanners',
}) {
  constructor(
    @Inject(marketingMicroserviceConfig.name)
    private readonly marketingMicroservice: ClientProxy,
  ) {
    super(marketingMicroservice, JSMarketingBannerMessagePattern);
  }
}
