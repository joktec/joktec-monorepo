import { Controller } from '@nestjs/common';
import { JobhopUserScoreNotificationService } from './jobhop-userscorenotification.service';
import {
  BaseMicroserviceController,
  JobhopUserScoreNotificationMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-userscorenotification')
export class JobhopUserScoreNotificationController extends BaseMicroserviceController(
  JobhopUserScoreNotificationMessagePattern,
) {
  constructor(
    private readonly jobhopUserScoreNotificationService: JobhopUserScoreNotificationService,
  ) {
    super(jobhopUserScoreNotificationService);
  }
}
