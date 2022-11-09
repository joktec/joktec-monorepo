import { Controller } from '@nestjs/common';
import { JobTitleService } from './job-title.service';
import {
  BaseMicroserviceController,
  JobTitleMessagePattern,
} from '@jobhopin/core';

@Controller('job-title')
export class JobTitleController extends BaseMicroserviceController(
  JobTitleMessagePattern,
) {
  constructor(private readonly jobTitleService: JobTitleService) {
    super(jobTitleService);
  }
}
