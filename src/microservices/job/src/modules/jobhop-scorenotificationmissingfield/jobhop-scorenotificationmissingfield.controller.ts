import { Controller } from '@nestjs/common';
import { JobhopScoreNotificationMissingFieldService } from './jobhop-scorenotificationmissingfield.service';
import {
  BaseMicroserviceController,
  JobhopScoreNotificationMissingFieldMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-scorenotificationmissingfield')
export class JobhopScoreNotificationMissingFieldController extends BaseMicroserviceController(
  JobhopScoreNotificationMissingFieldMessagePattern,
) {
  constructor(
    private readonly jobhopScoreNotificationMissingFieldService: JobhopScoreNotificationMissingFieldService,
  ) {
    super(jobhopScoreNotificationMissingFieldService);
  }
}
