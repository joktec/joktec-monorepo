import { Controller } from '@nestjs/common';
import { JobBudgetHistoryService } from './job-budget-history.service';
import {
  BaseMicroserviceController,
  JobBudgetHistoryMessagePattern,
} from '@jobhopin/core';

@Controller('job-budget-history')
export class JobBudgetHistoryController extends BaseMicroserviceController(
  JobBudgetHistoryMessagePattern,
) {
  constructor(
    private readonly jobBudgetHistoryService: JobBudgetHistoryService,
  ) {
    super(jobBudgetHistoryService);
  }
}
