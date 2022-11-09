import { BaseModel } from '../base.model';

// export enum SettingMessagePattern {
//   COMMON_SETTING_LIST = 'COMMON_SETTING_LIST',
//   COMMON_SETTING_GET = 'COMMON_SETTING_GET',
//   COMMON_SETTING_CREATE = 'COMMON_SETTING_CREATE',
//   COMMON_SETTING_UPDATE = 'COMMON_SETTING_UPDATE',
//   COMMON_SETTING_DELETE = 'COMMON_SETTING_DELETE',
// }

export interface Setting extends BaseModel {
  readonly skey?: string;
  readonly svalue?: string;
}
