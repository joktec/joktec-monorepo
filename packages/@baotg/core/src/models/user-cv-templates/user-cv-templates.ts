import { BaseModel } from '../base.model';
import { User } from '..';

export enum UserCvTemplateMessagePattern {
  USER_USER_CV_TEMPLATE_LIST = 'USER_USER_CV_TEMPLATE_LIST',
  USER_USER_CV_TEMPLATE_GET = 'USER_USER_CV_TEMPLATE_GET',
  USER_USER_CV_TEMPLATE_CREATE = 'USER_USER_CV_TEMPLATE_CREATE',
  USER_USER_CV_TEMPLATE_UPDATE = 'USER_USER_CV_TEMPLATE_UPDATE',
  USER_USER_CV_TEMPLATE_DELETE = 'USER_USER_CV_TEMPLATE_DELETE',
}

export interface UserCvTemplate extends BaseModel {
  readonly html?: string;
  readonly fileName?: string;
  readonly templateCode?: string;
  readonly linkCv?: string;
  readonly user?: string | User;

  // * Migration fields
  readonly userId?: string;
}
