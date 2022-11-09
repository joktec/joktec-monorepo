import { Controller } from '@nestjs/common';
import { JobGroupJobsService } from './jobgroup-jobs.service';
import {
  BaseMicroserviceController,
  JobGroupJobsMessagePattern,
} from '@jobhopin/core';

@Controller('jobgroup-jobs')
export class JobGroupJobsController extends BaseMicroserviceController(
  JobGroupJobsMessagePattern,
) {
  constructor(private readonly jobGroupJobsService: JobGroupJobsService) {
    super(jobGroupJobsService);
  }
}
