import { BaseModel } from '../base.model';
import { User } from '..';

export enum UserActivationMessagePattern {
  USER_USER_ACTIVATION_LIST = 'USER_USER_ACTIVATION_LIST',
  USER_USER_ACTIVATION_GET = 'USER_USER_ACTIVATION_GET',
  USER_USER_ACTIVATION_CREATE = 'USER_USER_ACTIVATION_CREATE',
  USER_USER_ACTIVATION_UPDATE = 'USER_USER_ACTIVATION_UPDATE',
  USER_USER_ACTIVATION_DELETE = 'USER_USER_ACTIVATION_DELETE',
}

export interface UserActivation extends BaseModel {
  readonly user?: string | User;

  // * Migration fields
  readonly platform?: number;
  readonly userId?: string;
}
