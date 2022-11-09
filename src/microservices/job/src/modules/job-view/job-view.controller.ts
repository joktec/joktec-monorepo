import { Controller } from '@nestjs/common';
import { JobViewService } from './job-view.service';
import {
  BaseMicroserviceController,
  JobViewMessagePattern,
} from '@jobhopin/core';

@Controller('job-view')
export class JobViewController extends BaseMicroserviceController(
  JobViewMessagePattern,
) {
  constructor(private readonly jobViewService: JobViewService) {
    super(jobViewService);
  }
}
