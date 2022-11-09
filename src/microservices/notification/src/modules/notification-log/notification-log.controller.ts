import { Controller } from '@nestjs/common';
import { NotificationLogService } from './notification-log.service';
import {
  BaseMicroserviceController,
  NotificationLogMessagePattern,
} from '@jobhopin/core';

@Controller('notification-log')
export class NotificationLogController extends BaseMicroserviceController(
  NotificationLogMessagePattern,
) {
  constructor(private readonly notificationLogService: NotificationLogService) {
    super(notificationLogService);
  }
}
