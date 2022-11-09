import { Controller } from '@nestjs/common';
import { JobStatsDetailService } from './job-stats-detail.service';
import {
  BaseMicroserviceController,
  JobStatsDetailMessagePattern,
} from '@jobhopin/core';

@Controller('job-stats-detail')
export class JobStatsDetailController extends BaseMicroserviceController(
  JobStatsDetailMessagePattern,
) {
  constructor(private readonly jobStatsDetailService: JobStatsDetailService) {
    super(jobStatsDetailService);
  }
}
