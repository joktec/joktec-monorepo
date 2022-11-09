import { Controller } from '@nestjs/common';
import { JobMatchBudgetSentService } from './jobmatch-budget-sent.service';
import {
  BaseMicroserviceController,
  JobMatchBudgetSentMessagePattern,
} from '@jobhopin/core';

@Controller('jobmatch-budget-sent')
export class JobMatchBudgetSentController extends BaseMicroserviceController(
  JobMatchBudgetSentMessagePattern,
) {
  constructor(
    private readonly jobMatchBudgetSentService: JobMatchBudgetSentService,
  ) {
    super(jobMatchBudgetSentService);
  }
}
