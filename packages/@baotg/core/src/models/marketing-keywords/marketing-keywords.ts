import { BaseModel } from '../base.model';

// export enum MarketingKeywordMessagePattern {
//   COMMON_MARKETING_KEYWORD_LIST = 'COMMON_MARKETING_KEYWORD_LIST',
//   COMMON_MARKETING_KEYWORD_GET = 'COMMON_MARKETING_KEYWORD_GET',
//   COMMON_MARKETING_KEYWORD_CREATE = 'COMMON_MARKETING_KEYWORD_CREATE',
//   COMMON_MARKETING_KEYWORD_UPDATE = 'COMMON_MARKETING_KEYWORD_UPDATE',
//   COMMON_MARKETING_KEYWORD_DELETE = 'COMMON_MARKETING_KEYWORD_DELETE',
// }

export interface MarketingKeyword extends BaseModel {
  readonly name?: string;
  readonly nameEng?: string;
  readonly link?: string;
  readonly keywordType?: string;
  readonly priority?: number;
}
