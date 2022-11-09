import { Controller } from '@nestjs/common';
import { JobBountyHistoryService } from './job-bounty-history.service';
import {
  BaseMicroserviceController,
  JobBountyHistoryMessagePattern,
} from '@jobhopin/core';

@Controller('job-bounty-history')
export class JobBountyHistoryController extends BaseMicroserviceController(
  JobBountyHistoryMessagePattern,
) {
  constructor(
    private readonly jobBountyHistoryService: JobBountyHistoryService,
  ) {
    super(jobBountyHistoryService);
  }
}
