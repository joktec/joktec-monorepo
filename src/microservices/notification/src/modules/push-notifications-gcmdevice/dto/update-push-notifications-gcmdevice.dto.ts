import { PartialType } from '@nestjs/mapped-types';
import { CreatePushNotificationsGcmdeviceDto } from './create-push-notifications-gcmdevice.dto';

export class UpdatePushNotificationsGcmdeviceDto extends PartialType(CreatePushNotificationsGcmdeviceDto) {}
