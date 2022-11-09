import { PartialType } from '@nestjs/mapped-types';
import { CreatePushNotificationsWnsdeviceDto } from './create-push-notifications-wnsdevice.dto';

export class UpdatePushNotificationsWnsdeviceDto extends PartialType(CreatePushNotificationsWnsdeviceDto) {}
