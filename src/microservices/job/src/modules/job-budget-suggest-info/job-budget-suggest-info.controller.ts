import { Controller } from '@nestjs/common';
import { JobBudgetSuggestInfoService } from './job-budget-suggest-info.service';
import {
  BaseMicroserviceController,
  JobBudgetSuggestInfoMessagePattern,
} from '@jobhopin/core';

@Controller('job-budget-suggest-info')
export class JobBudgetSuggestInfoController extends BaseMicroserviceController(
  JobBudgetSuggestInfoMessagePattern,
) {
  constructor(
    private readonly jobBudgetSuggestInfoService: JobBudgetSuggestInfoService,
  ) {
    super(jobBudgetSuggestInfoService);
  }
}
