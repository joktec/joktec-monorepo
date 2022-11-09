import {
  BaseMicroserviceController,
  KeywordMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { KeywordService } from './keyword.service';

@Controller('keyword')
export class KeywordController extends BaseMicroserviceController(
  KeywordMessagePattern,
) {
  constructor(private readonly keywordService: KeywordService) {
    super(keywordService);
  }
}
