import { Controller } from '@nestjs/common';
import { JobhopSuggestedKeywordService } from './jobhop-suggestedkeyword.service';
import {
  BaseMicroserviceController,
  JobhopSuggestedKeywordMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-suggestedkeyword')
export class JobhopSuggestedKeywordController extends BaseMicroserviceController(
  JobhopSuggestedKeywordMessagePattern,
) {
  constructor(
    private readonly jobhopSuggestedKeywordService: JobhopSuggestedKeywordService,
  ) {
    super(jobhopSuggestedKeywordService);
  }
}
