import { Controller } from '@nestjs/common';
import { JobBudgetRequestAddedService } from './job-budget-request-added.service';
import {
  BaseMicroserviceController,
  JobBudgetRequestAddedMessagePattern,
} from '@jobhopin/core';

@Controller('job-budget-request-added')
export class JobBudgetRequestAddedController extends BaseMicroserviceController(
  JobBudgetRequestAddedMessagePattern,
) {
  constructor(
    private readonly jobBudgetRequestAddedService: JobBudgetRequestAddedService,
  ) {
    super(jobBudgetRequestAddedService);
  }
}
