import { Controller } from '@nestjs/common';
import { JobBudgetLogService } from './job-budget-log.service';
import {
  BaseMicroserviceController,
  JobBudgetLogMessagePattern,
} from '@jobhopin/core';

@Controller('job-budget-log')
export class JobBudgetLogController extends BaseMicroserviceController(
  JobBudgetLogMessagePattern,
) {
  constructor(private readonly jobBudgetLogService: JobBudgetLogService) {
    super(jobBudgetLogService);
  }
}
