import { Controller } from '@nestjs/common';
import { JobBountyService } from './job-bounty.service';
import {
  BaseMicroserviceController,
  JobBountyMessagePattern,
} from '@jobhopin/core';

@Controller('job-bounty')
export class JobBountyController extends BaseMicroserviceController(
  JobBountyMessagePattern,
) {
  constructor(private readonly jobBountyService: JobBountyService) {
    super(jobBountyService);
  }
}
