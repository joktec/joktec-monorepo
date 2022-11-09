import { Controller } from '@nestjs/common';
import { JobhopScoreNotificationGroupService } from './jobhop-scorenotificationgroup.service';
import {
  BaseMicroserviceController,
  JobhopScoreNotificationGroupMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-scorenotificationgroup')
export class JobhopScoreNotificationGroupController extends BaseMicroserviceController(
  JobhopScoreNotificationGroupMessagePattern,
) {
  constructor(
    private readonly jobhopScoreNotificationGroupService: JobhopScoreNotificationGroupService,
  ) {
    super(jobhopScoreNotificationGroupService);
  }
}
