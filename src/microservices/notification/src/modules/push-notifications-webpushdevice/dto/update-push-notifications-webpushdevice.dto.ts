import { PartialType } from '@nestjs/mapped-types';
import { CreatePushNotificationsWebpushdeviceDto } from './create-push-notifications-webpushdevice.dto';

export class UpdatePushNotificationsWebpushdeviceDto extends PartialType(CreatePushNotificationsWebpushdeviceDto) {}
