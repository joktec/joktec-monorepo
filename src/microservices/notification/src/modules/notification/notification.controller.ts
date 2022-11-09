import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  BaseMicroserviceController,
  NotificationMessagePattern,
} from '@jobhopin/core';

@Controller('notification')
export class NotificationController extends BaseMicroserviceController(
  NotificationMessagePattern,
) {
  constructor(private readonly notificationService: NotificationService) {
    super(notificationService);
  }
}
