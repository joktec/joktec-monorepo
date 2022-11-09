import { Controller } from '@nestjs/common';
import { PushNotificationsWnsdeviceService } from './push-notifications-wnsdevice.service';
import {
  BaseMicroserviceController,
  PushNotificationsWnsdeviceMessagePattern,
} from '@jobhopin/core';

@Controller('push-notifications-wnsdevice')
export class PushNotificationsWnsdeviceController extends BaseMicroserviceController(
  PushNotificationsWnsdeviceMessagePattern,
) {
  constructor(
    private readonly pushNotificationsWnsdeviceService: PushNotificationsWnsdeviceService,
  ) {
    super(pushNotificationsWnsdeviceService);
  }
}
