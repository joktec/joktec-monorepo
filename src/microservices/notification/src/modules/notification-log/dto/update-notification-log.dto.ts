import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationLogDto } from './create-notification-log.dto';

export class UpdateNotificationLogDto extends PartialType(CreateNotificationLogDto) {}
