import {
  BaseController,
  CreateMarketingSeoKeywordInput,
  MarketingSeoKeywordDto,
  MarketingSeoKeywordListResponseDto,
  MarketingSeoKeywordMessagePattern,
  CommonMicroserviceConfig,
  MarketingSeoKeywordQueryInput,
  UpdateMarketingSeoKeywordInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../marketing-seo-keyword.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class MarketingSeoKeywordController extends BaseController<
  MarketingSeoKeywordDto,
  CreateMarketingSeoKeywordInput,
  UpdateMarketingSeoKeywordInput,
  MarketingSeoKeywordQueryInput,
  MarketingSeoKeywordListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, MarketingSeoKeywordMessagePattern);
  }
}
