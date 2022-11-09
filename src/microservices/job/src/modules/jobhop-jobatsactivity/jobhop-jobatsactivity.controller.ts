import { Controller } from '@nestjs/common';
import { JobhopJobAtsActivityService } from './jobhop-jobatsactivity.service';
import {
  BaseMicroserviceController,
  JobhopJobAtsActivityMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-jobatsactivity')
export class JobhopJobAtsActivityController extends BaseMicroserviceController(
  JobhopJobAtsActivityMessagePattern,
) {
  constructor(
    private readonly jobhopJobAtsActivityService: JobhopJobAtsActivityService,
  ) {
    super(jobhopJobAtsActivityService);
  }
}
