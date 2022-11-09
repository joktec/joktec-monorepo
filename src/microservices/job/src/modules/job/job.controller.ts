import { BaseMicroserviceController, JobMessagePattern } from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController extends BaseMicroserviceController(
  JobMessagePattern,
) {
  constructor(private readonly jobService: JobService) {
    super(jobService);
  }
}
