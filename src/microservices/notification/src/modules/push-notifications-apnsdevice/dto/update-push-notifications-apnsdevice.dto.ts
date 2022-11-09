import { PartialType } from '@nestjs/mapped-types';
import { CreatePushNotificationsApnsdeviceDto } from './create-push-notifications-apnsdevice.dto';

export class UpdatePushNotificationsApnsdeviceDto extends PartialType(CreatePushNotificationsApnsdeviceDto) {}
