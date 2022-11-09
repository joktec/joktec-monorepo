import { Controller } from '@nestjs/common';
import { JobhopScoreNotificationService } from './jobhop-scorenotification.service';
import {
  BaseMicroserviceController,
  JobhopScoreNotificationMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-scorenotification')
export class JobhopScoreNotificationController extends BaseMicroserviceController(
  JobhopScoreNotificationMessagePattern,
) {
  constructor(
    private readonly jobhopScorenotificationService: JobhopScoreNotificationService,
  ) {
    super(jobhopScorenotificationService);
  }
}
