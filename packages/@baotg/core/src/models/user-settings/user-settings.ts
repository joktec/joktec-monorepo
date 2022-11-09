import { BaseModel } from '../base.model';
import { User } from '..';

export enum UserSettingMessagePattern {
  USER_USER_SETTING_LIST = 'USER_USER_SETTING_LIST',
  USER_USER_SETTING_GET = 'USER_USER_SETTING_GET',
  USER_USER_SETTING_CREATE = 'USER_USER_SETTING_CREATE',
  USER_USER_SETTING_UPDATE = 'USER_USER_SETTING_UPDATE',
  USER_USER_SETTING_DELETE = 'USER_USER_SETTING_DELETE',
}

export enum UserSettingNotificationType {
  On = 'ON',
  Off = 'OFF',
  Default = On,
}

export interface UserSetting extends BaseModel {
  readonly language?: string;
  readonly receivedNotiApp?: UserSettingNotificationType;
  readonly askThumbdownJob?: number;
  readonly locationPermission?: number;
  readonly user?: string | User;
  // * TODO:
  readonly location?: string;

  // * Migration fields
  readonly locationId?: string;
  readonly userId?: string;
}
