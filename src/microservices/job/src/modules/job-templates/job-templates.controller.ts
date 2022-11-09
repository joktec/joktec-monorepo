import { Controller } from '@nestjs/common';
import { JobTemplatesService } from './job-templates.service';
import {
  BaseMicroserviceController,
  JobTemplatesMessagePattern,
} from '@jobhopin/core';

@Controller('job-templates')
export class JobTemplatesController extends BaseMicroserviceController(
  JobTemplatesMessagePattern,
) {
  constructor(private readonly jobTemplatesService: JobTemplatesService) {
    super(jobTemplatesService);
  }
}
