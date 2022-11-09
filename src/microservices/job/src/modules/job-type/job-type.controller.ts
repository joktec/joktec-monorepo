import {
  BaseMicroserviceController,
  JobTypeMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { JobTypeService } from './job-type.service';

@Controller('job')
export class JobTypeController extends BaseMicroserviceController(
  JobTypeMessagePattern,
) {
  constructor(private readonly jobService: JobTypeService) {
    super(jobService);
  }
}
