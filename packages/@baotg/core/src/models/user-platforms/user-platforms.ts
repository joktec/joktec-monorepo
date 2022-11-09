import { BaseModel } from '../base.model';
import { User } from '..';

export enum UserPlatformMessagePattern {
  USER_USER_PLATFORM_LIST = 'USER_USER_PLATFORM_LIST',
  USER_USER_PLATFORM_GET = 'USER_USER_PLATFORM_GET',
  USER_USER_PLATFORM_CREATE = 'USER_USER_PLATFORM_CREATE',
  USER_USER_PLATFORM_UPDATE = 'USER_USER_PLATFORM_UPDATE',
  USER_USER_PLATFORM_DELETE = 'USER_USER_PLATFORM_DELETE',
}

export interface UserPlatform extends BaseModel {
  readonly user?: string | User;
  // * TODO:
  readonly platform?: number;

  // * Migration fields
  readonly platformId?: string;
  readonly userId?: string;
}
