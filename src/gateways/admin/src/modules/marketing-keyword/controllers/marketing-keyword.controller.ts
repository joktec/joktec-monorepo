import {
  BaseController,
  CreateMarketingKeywordInput,
  MarketingKeywordDto,
  MarketingKeywordListResponseDto,
  MarketingKeywordMessagePattern,
  CommonMicroserviceConfig,
  MarketingKeywordQueryInput,
  UpdateMarketingKeywordInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../marketing-keyword.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class MarketingKeywordController extends BaseController<
  MarketingKeywordDto,
  CreateMarketingKeywordInput,
  UpdateMarketingKeywordInput,
  MarketingKeywordQueryInput,
  MarketingKeywordListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, MarketingKeywordMessagePattern);
  }
}
