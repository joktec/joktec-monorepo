import {
  BaseMicroserviceController,
  JobVersionMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { JobVersionService } from './job-version.service';

@Controller('job-version')
export class JobVersionController extends BaseMicroserviceController(
  JobVersionMessagePattern,
) {
  constructor(private readonly jobVersionService: JobVersionService) {
    super(jobVersionService);
  }
}
