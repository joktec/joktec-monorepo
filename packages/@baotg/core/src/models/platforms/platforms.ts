import { BaseModel } from '../base.model';

// export enum PlatformMessagePattern {
//   COMMON_PLATFORM_LIST = 'COMMON_PLATFORM_LIST',
//   COMMON_PLATFORM_GET = 'COMMON_PLATFORM_GET',
//   COMMON_PLATFORM_CREATE = 'COMMON_PLATFORM_CREATE',
//   COMMON_PLATFORM_UPDATE = 'COMMON_PLATFORM_UPDATE',
//   COMMON_PLATFORM_DELETE = 'COMMON_PLATFORM_DELETE',
// }

export interface Platform extends BaseModel {
  readonly name?: string;
  readonly code?: string;
}
