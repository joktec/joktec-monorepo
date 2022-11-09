import { Controller } from '@nestjs/common';
import { JobInterviewService } from './job-interview.service';
import {
  BaseMicroserviceController,
  JobInterviewMessagePattern,
} from '@jobhopin/core';

@Controller('job-interview')
export class JobInterviewController extends BaseMicroserviceController(
  JobInterviewMessagePattern,
) {
  constructor(private readonly jobInterviewService: JobInterviewService) {
    super(jobInterviewService);
  }
}
