import { Controller } from '@nestjs/common';
import { JobInterviewCsInChargeService } from './job-interview-cs-in-charge.service';
import {
  BaseMicroserviceController,
  JobInterviewCsInChargeMessagePattern,
} from '@jobhopin/core';

@Controller('job-interview-cs-in-charge')
export class JobInterviewCsInChargeController extends BaseMicroserviceController(
  JobInterviewCsInChargeMessagePattern,
) {
  constructor(
    private readonly jobInterviewCsInChargeService: JobInterviewCsInChargeService,
  ) {
    super(jobInterviewCsInChargeService);
  }
}
