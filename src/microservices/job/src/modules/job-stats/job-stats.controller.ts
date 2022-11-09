import { Controller } from '@nestjs/common';
import { JobStatsService } from './job-stats.service';
import {
  BaseMicroserviceController,
  JobStatsMessagePattern,
} from '@jobhopin/core';

@Controller('job-stats')
export class JobStatsController extends BaseMicroserviceController(
  JobStatsMessagePattern,
) {
  constructor(private readonly jobStatsService: JobStatsService) {
    super(jobStatsService);
  }
}
