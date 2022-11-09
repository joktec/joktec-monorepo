import { Controller } from '@nestjs/common';
import { JobSalaryTemplateService } from './job-salary-template.service';
import {
  BaseMicroserviceController,
  JobSalaryTemplateMessagePattern,
} from '@jobhopin/core';

@Controller('job-salary-template')
export class JobSalaryTemplateController extends BaseMicroserviceController(
  JobSalaryTemplateMessagePattern,
) {
  constructor(
    private readonly jobSalaryTemplateService: JobSalaryTemplateService,
  ) {
    super(jobSalaryTemplateService);
  }
}
