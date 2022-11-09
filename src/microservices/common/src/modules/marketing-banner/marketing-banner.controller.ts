import {
  BaseMicroserviceController,
  MarketingBannerMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MarketingBannerService } from './marketing-banner.service';
import { PLURAL_NAME } from './marketing-banner.constants';

@Controller(PLURAL_NAME)
export class MarketingBannerController extends BaseMicroserviceController(
  MarketingBannerMessagePattern,
) {
  constructor(private readonly marketingBannerService: MarketingBannerService) {
    super(marketingBannerService);
  }
}
