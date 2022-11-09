import { Controller } from '@nestjs/common';
import { JobhopJobSettingService } from './jobhop-jobsetting.service';
import {
  BaseMicroserviceController,
  JobhopJobsettingMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-jobsetting')
export class JobhopJobSettingController extends BaseMicroserviceController(
  JobhopJobsettingMessagePattern,
) {
  constructor(
    private readonly jobhopJobSettingService: JobhopJobSettingService,
  ) {
    super(jobhopJobSettingService);
  }
}
