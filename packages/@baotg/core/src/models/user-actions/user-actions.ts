import { BaseModel } from '../base.model';

export enum UserActionMessagePattern {
  USER_USER_ACTION_LIST = 'USER_USER_ACTION_LIST',
  USER_USER_ACTION_GET = 'USER_USER_ACTION_GET',
  USER_USER_ACTION_CREATE = 'USER_USER_ACTION_CREATE',
  USER_USER_ACTION_UPDATE = 'USER_USER_ACTION_UPDATE',
  USER_USER_ACTION_DELETE = 'USER_USER_ACTION_DELETE',
}

export enum UserActionType {
  Login = 'LOGIN',
}

export enum UserActionStatus {
  Failed = 'FAILED',
  FailedUncount = 'FAILED-UNCOUNT',
  LockedAccount = 'LOCKED_ACCOUNT',
  Passed = 'PASSED',
}

export interface UserAction extends BaseModel {
  readonly username?: string;
  readonly platform?: string;
  readonly actionType?: UserActionType;
  readonly actionStatus?: UserActionStatus;
}
