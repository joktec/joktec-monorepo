import { Controller } from '@nestjs/common';
import { JobTitleSalaryRangeService } from './job-title-salary-range.service';
import {
  BaseMicroserviceController,
  JobTitleSalaryRangeMessagePattern,
} from '@jobhopin/core';

@Controller('job-title-salary-range')
export class JobTitleSalaryRangeController extends BaseMicroserviceController(
  JobTitleSalaryRangeMessagePattern,
) {
  constructor(
    private readonly jobTitleSalaryRangeService: JobTitleSalaryRangeService,
  ) {
    super(jobTitleSalaryRangeService);
  }
}
