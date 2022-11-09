import { Controller } from '@nestjs/common';
import { NotificationChannelSettingService } from './notification-channel-setting.service';
import {
  BaseMicroserviceController,
  NotificationChannelSettingMessagePattern,
} from '@jobhopin/core';

@Controller('notification-channel-setting')
export class NotificationChannelSettingController extends BaseMicroserviceController(
  NotificationChannelSettingMessagePattern,
) {
  constructor(
    private readonly notificationChannelSettingService: NotificationChannelSettingService,
  ) {
    super(notificationChannelSettingService);
  }
}
