import { Controller } from '@nestjs/common';
import { JobThumdownReasonService } from './job-thumdown-reason.service';
import {
  BaseMicroserviceController,
  JobThumdownReasonMessagePattern,
} from '@jobhopin/core';

@Controller('job-thumdown-reason')
export class JobThumdownReasonController extends BaseMicroserviceController(
  JobThumdownReasonMessagePattern,
) {
  constructor(
    private readonly jobThumdownReasonService: JobThumdownReasonService,
  ) {
    super(jobThumdownReasonService);
  }
}
