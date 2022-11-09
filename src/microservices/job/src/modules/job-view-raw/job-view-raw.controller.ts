import { Controller } from '@nestjs/common';
import { JobViewRawService } from './job-view-raw.service';
import {
  BaseMicroserviceController,
  JobViewRawMessagePattern,
} from '@jobhopin/core';

@Controller('job-view-raw')
export class JobViewRawController extends BaseMicroserviceController(
  JobViewRawMessagePattern,
) {
  constructor(private readonly jobViewRawService: JobViewRawService) {
    super(jobViewRawService);
  }
}
