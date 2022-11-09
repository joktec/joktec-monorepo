import { Controller } from '@nestjs/common';
import { JobSubscriptionHistoryService } from './job-subscription-history.service';
import {
  BaseMicroserviceController,
  JobSubscriptionHistoryMessagePattern,
} from '@jobhopin/core';

@Controller('job-subscription-history')
export class JobSubscriptionHistoryController extends BaseMicroserviceController(
  JobSubscriptionHistoryMessagePattern,
) {
  constructor(
    private readonly jobSubscriptionHistoryService: JobSubscriptionHistoryService,
  ) {
    super(jobSubscriptionHistoryService);
  }
}
