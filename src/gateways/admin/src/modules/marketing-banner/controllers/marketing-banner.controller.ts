import {
  BaseController,
  CreateMarketingBannerInput,
  MarketingBannerDto,
  MarketingBannerListResponseDto,
  MarketingBannerMessagePattern,
  CommonMicroserviceConfig,
  MarketingBannerQueryInput,
  UpdateMarketingBannerInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../marketing-banner.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class MarketingBannerController extends BaseController<
  MarketingBannerDto,
  CreateMarketingBannerInput,
  UpdateMarketingBannerInput,
  MarketingBannerQueryInput,
  MarketingBannerListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, MarketingBannerMessagePattern);
  }
}
