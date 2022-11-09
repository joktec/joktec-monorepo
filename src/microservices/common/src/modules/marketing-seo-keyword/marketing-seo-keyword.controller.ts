import {
  BaseMicroserviceController,
  MarketingSeoKeywordMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MarketingSeoKeywordService } from './marketing-seo-keyword.service';
import { PLURAL_NAME } from './marketing-seo-keyword.constants';

@Controller(PLURAL_NAME)
export class MarketingSeoKeywordController extends BaseMicroserviceController(
  MarketingSeoKeywordMessagePattern,
) {
  constructor(private readonly marketingSeoKeywordService: MarketingSeoKeywordService) {
    super(marketingSeoKeywordService);
  }
}
