import {
  BaseMicroserviceController,
  MarketingKeywordMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MarketingKeywordService } from './marketing-keyword.service';
import { PLURAL_NAME } from './marketing-keyword.constants';

@Controller(PLURAL_NAME)
export class MarketingKeywordController extends BaseMicroserviceController(
  MarketingKeywordMessagePattern,
) {
  constructor(private readonly marketingKeywordService: MarketingKeywordService) {
    super(marketingKeywordService);
  }
}
