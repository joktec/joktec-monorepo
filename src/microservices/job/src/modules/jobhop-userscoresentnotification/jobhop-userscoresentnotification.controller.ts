import { Controller } from '@nestjs/common';
import { JobhopUserScoreSentNotificationService } from './jobhop-userscoresentnotification.service';
import {
  BaseMicroserviceController,
  JobhopUserScoreSentNotificationMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-userscoresentnotification')
export class JobhopUserScoreSentNotificationController extends BaseMicroserviceController(
  JobhopUserScoreSentNotificationMessagePattern,
) {
  constructor(
    private readonly jobhopUserScoreSentNotificationService: JobhopUserScoreSentNotificationService,
  ) {
    super(jobhopUserScoreSentNotificationService);
  }
}
