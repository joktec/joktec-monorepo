import { ApiPropertyOptional, ArrayMinSize, IsArray, IsBoolean, IsMongoId, IsOptional, ValidateIf } from '@joktec/core';
import { IMongoRequest } from '@joktec/mongo';
import { Notification } from '../../../models/schemas';

export enum ReadStatus {
  ALL = 'all',
  READ = 'read',
  UNREAD = 'unread',
}

export interface NotificationFilterDto extends IMongoRequest<Notification> {
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
