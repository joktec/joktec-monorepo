import { Controller } from '@nestjs/common';
import { JobLinkService } from './job-link.service';
import {
  BaseMicroserviceController,
  JobLinkMessagePattern,
} from '@jobhopin/core';

@Controller('job-link')
export class JobLinkController extends BaseMicroserviceController(
  JobLinkMessagePattern,
) {
  constructor(private readonly jobLinkService: JobLinkService) {
    super(jobLinkService);
  }
}
