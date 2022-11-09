import { BaseModel } from '../base.model';
import { User } from '../';

export enum UserLocationMessagePattern {
  USER_USER_LOCATION_LIST = 'USER_USER_LOCATION_LIST',
  USER_USER_LOCATION_GET = 'USER_USER_LOCATION_GET',
  USER_USER_LOCATION_CREATE = 'USER_USER_LOCATION_CREATE',
  USER_USER_LOCATION_UPDATE = 'USER_USER_LOCATION_UPDATE',
  USER_USER_LOCATION_DELETE = 'USER_USER_LOCATION_DELETE',
}

export interface UserLocation extends BaseModel {
  readonly lat?: number;
  readonly lon?: number;
  readonly user?: string | User;

  // * Migration fields
  readonly userId?: string;
}
