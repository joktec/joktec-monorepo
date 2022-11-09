import { BaseModel } from '../base.model';

export enum UserTalentKeywordMessagePattern {
  USER_USER_TALENT_KEYWORD_LIST = 'USER_USER_TALENT_KEYWORD_LIST',
  USER_USER_TALENT_KEYWORD_GET = 'USER_USER_TALENT_KEYWORD_GET',
  USER_USER_TALENT_KEYWORD_CREATE = 'USER_USER_TALENT_KEYWORD_CREATE',
  USER_USER_TALENT_KEYWORD_UPDATE = 'USER_USER_TALENT_KEYWORD_UPDATE',
  USER_USER_TALENT_KEYWORD_DELETE = 'USER_USER_TALENT_KEYWORD_DELETE',
}

export interface UserTalentKeyword extends BaseModel {
  readonly email?: string;

  // * Migration fields
  readonly talentKeywordId?: string;
}
