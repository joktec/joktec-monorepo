import { BaseModel } from '../base.model';
import { User } from '..';

export enum UserCvMessagePattern {
  USER_USER_CV_LIST = 'USER_USER_CV_LIST',
  USER_USER_CV_GET = 'USER_USER_CV_GET',
  USER_USER_CV_CREATE = 'USER_USER_CV_CREATE',
  USER_USER_CV_UPDATE = 'USER_USER_CV_UPDATE',
  USER_USER_CV_DELETE = 'USER_USER_CV_DELETE',
}

export interface UserCv extends BaseModel {
  readonly status?: string;
  readonly originalLink?: string;
  readonly user?: string | User;
  // * TODO:
  readonly organization?: string;
  readonly cv?: string;

  // * Migration fields
  readonly cvId?: string;
  readonly organizationId?: string;
  readonly userId?: string;
}
