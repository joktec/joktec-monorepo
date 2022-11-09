import { BaseModel } from '../base.model';

// export enum MarketingBannerMessagePattern {
//   COMMON_MARKETING_BANNER_LIST = 'COMMON_MARKETING_BANNER_LIST',
//   COMMON_MARKETING_BANNER_GET = 'COMMON_MARKETING_BANNER_GET',
//   COMMON_MARKETING_BANNER_CREATE = 'COMMON_MARKETING_BANNER_CREATE',
//   COMMON_MARKETING_BANNER_UPDATE = 'COMMON_MARKETING_BANNER_UPDATE',
//   COMMON_MARKETING_BANNER_DELETE = 'COMMON_MARKETING_BANNER_DELETE',
// }

export interface MarketingBanner extends BaseModel {
  readonly file?: string;
  readonly lang?: string;
  readonly redirectLink?: string;
  readonly bannerType?: string;
  readonly bannerPosition?: string;
  readonly marketingLocation?: string;
  readonly page?: string;
  readonly validFrom?: Date;
  readonly validUntil?: Date;
  readonly active?: number;
  readonly isTest?: number;
}
