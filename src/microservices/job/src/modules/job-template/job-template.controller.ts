import { Controller } from '@nestjs/common';
import { JobTemplateService } from './job-template.service';
import {
  BaseMicroserviceController,
  JobTemplateMessagePattern,
} from '@jobhopin/core';

@Controller('job-template')
export class JobTemplateController extends BaseMicroserviceController(
  JobTemplateMessagePattern,
) {
  constructor(private readonly jobTemplateService: JobTemplateService) {
    super(jobTemplateService);
  }
}
