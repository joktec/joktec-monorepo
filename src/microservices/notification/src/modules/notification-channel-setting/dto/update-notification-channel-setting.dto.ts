import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationChannelSettingDto } from './create-notification-channel-setting.dto';

export class UpdateNotificationChannelSettingDto extends PartialType(CreateNotificationChannelSettingDto) {}
