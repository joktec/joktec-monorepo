import { Controller } from '@nestjs/common';
import { PushNotificationsWebpushdeviceService } from './push-notifications-webpushdevice.service';
import {
  BaseMicroserviceController,
  PushNotificationsWebpushdeviceMessagePattern,
} from '@jobhopin/core';

@Controller('push-notifications-webpushdevice')
export class PushNotificationsWebpushdeviceController extends BaseMicroserviceController(
  PushNotificationsWebpushdeviceMessagePattern,
) {
  constructor(
    private readonly pushNotificationsWebpushdeviceService: PushNotificationsWebpushdeviceService,
  ) {
    super(pushNotificationsWebpushdeviceService);
  }
}
