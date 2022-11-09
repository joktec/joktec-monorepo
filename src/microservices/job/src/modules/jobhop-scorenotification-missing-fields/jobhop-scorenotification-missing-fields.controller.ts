import { Controller } from '@nestjs/common';
import { JobhopScoreNotificationMissingFieldsService } from './jobhop-scorenotification-missing-fields.service';
import {
  BaseMicroserviceController,
  JobhopScoreNotificationMissingFieldsMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-scorenotification-missing-fields')
export class JobhopScoreNotificationMissingFieldsController extends BaseMicroserviceController(
  JobhopScoreNotificationMissingFieldsMessagePattern,
) {
  constructor(
    private readonly jobhopScoreNotificationMissingFieldsService: JobhopScoreNotificationMissingFieldsService,
  ) {
    super(jobhopScoreNotificationMissingFieldsService);
  }
}
