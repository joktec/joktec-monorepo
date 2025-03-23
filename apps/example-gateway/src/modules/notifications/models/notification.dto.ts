import { ApiPropertyOptional } from '@joktec/core';
import { IMongoRequest } from '@joktec/mongo';
import { ArrayMinSize, IsArray, IsBoolean, IsMongoId, IsOptional, ValidateIf } from '@joktec/utils';
import { Notification } from '../../../models/schemas';

export enum ReadStatus {
  ALL = 'all',
  READ = 'read',
  UNREAD = 'unread',
}

export interface INotificationFilterDto extends IMongoRequest<Notification> {
  readStatus?: ReadStatus;
}

export class NotificationFilterDto implements INotificationFilterDto {
  @ApiPropertyOptional({ enum: ReadStatus })
  readStatus?: ReadStatus;
}

export class NotificationReadDto {
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  readAll?: boolean = false;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  @ValidateIf(o => !o.readAll)
  @ApiPropertyOptional({ type: String, isArray: true })
  notificationIds?: string[] = [];
}
