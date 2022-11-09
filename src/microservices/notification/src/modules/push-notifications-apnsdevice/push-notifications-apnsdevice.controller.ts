import { Controller } from '@nestjs/common';
import { PushNotificationsApnsdeviceService } from './push-notifications-apnsdevice.service';
import {
  BaseMicroserviceController,
  PushNotificationsApnsdeviceMessagePattern,
} from '@jobhopin/core';

@Controller('push-notifications-apnsdevice')
export class PushNotificationsApnsdeviceController extends BaseMicroserviceController(
  PushNotificationsApnsdeviceMessagePattern,
) {
  constructor(
    private readonly pushNotificationsApnsdeviceService: PushNotificationsApnsdeviceService,
  ) {
    super(pushNotificationsApnsdeviceService);
  }
}
