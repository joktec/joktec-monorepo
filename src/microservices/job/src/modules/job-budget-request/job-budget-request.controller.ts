import { Controller } from '@nestjs/common';
import { JobBudgetRequestService } from './job-budget-request.service';
import {
  BaseMicroserviceController,
  JobBudgetRequestMessagePattern,
} from '@jobhopin/core';

@Controller('job-budget-request')
export class JobBudgetRequestController extends BaseMicroserviceController(
  JobBudgetRequestMessagePattern,
) {
  constructor(
    private readonly jobBudgetRequestService: JobBudgetRequestService,
  ) {
    super(jobBudgetRequestService);
  }
}
