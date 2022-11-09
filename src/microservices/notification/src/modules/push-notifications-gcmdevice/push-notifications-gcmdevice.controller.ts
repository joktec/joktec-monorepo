import { Controller } from '@nestjs/common';
import { PushNotificationsGcmdeviceService } from './push-notifications-gcmdevice.service';
import {
  BaseMicroserviceController,
  PushNotificationsGcmdeviceMessagePattern,
} from '@jobhopin/core';

@Controller('push-notifications-gcmdevice')
export class PushNotificationsGcmdeviceController extends BaseMicroserviceController(
  PushNotificationsGcmdeviceMessagePattern,
) {
  constructor(
    private readonly pushNotificationsGcmdeviceService: PushNotificationsGcmdeviceService,
  ) {
    super(pushNotificationsGcmdeviceService);
  }
}
