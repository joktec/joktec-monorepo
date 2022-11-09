import { Controller } from '@nestjs/common';
import { JobhopUserActivityService } from './jobhop-useractivity.service';
import {
  BaseMicroserviceController,
  JobhopUserActivityMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-useractivity')
export class JobhopUserActivityController extends BaseMicroserviceController(
  JobhopUserActivityMessagePattern,
) {
  constructor(
    private readonly jobhopUserActivityService: JobhopUserActivityService,
  ) {
    super(jobhopUserActivityService);
  }
}
