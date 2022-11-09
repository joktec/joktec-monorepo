import { BaseModel } from '../base.model';

export enum UserEmailVerificationMessagePattern {
  USER_USER_EMAIL_VERIFICATION_LIST = 'USER_USER_EMAIL_VERIFICATION_LIST',
  USER_USER_EMAIL_VERIFICATION_GET = 'USER_USER_EMAIL_VERIFICATION_GET',
  USER_USER_EMAIL_VERIFICATION_CREATE = 'USER_USER_EMAIL_VERIFICATION_CREATE',
  USER_USER_EMAIL_VERIFICATION_UPDATE = 'USER_USER_EMAIL_VERIFICATION_UPDATE',
  USER_USER_EMAIL_VERIFICATION_DELETE = 'USER_USER_EMAIL_VERIFICATION_DELETE',
}

export enum UserEmailVerificationStatusType {
  CLOSED = 'CLOSED',
  NEW = 'NEW',
  USED = 'USED',
}

export interface UserEmailVerification extends BaseModel {
  readonly email?: string;
  readonly password?: string;
  readonly verifyCode?: string;
  readonly verifyCodeStatus?: UserEmailVerificationStatusType;

  // * Migration fields
}
