import { BaseModel } from '../base.model';

// export enum BannerMessagePattern {
//   COMMON_BANNER_LIST = 'COMMON_BANNER_LIST',
//   COMMON_BANNER_GET = 'COMMON_BANNER_GET',
//   COMMON_BANNER_CREATE = 'COMMON_BANNER_CREATE',
//   COMMON_BANNER_UPDATE = 'COMMON_BANNER_UPDATE',
//   COMMON_BANNER_DELETE = 'COMMON_BANNER_DELETE',
// }

export interface Banner extends BaseModel {
  readonly file?: string;
  readonly lang?: string;
  readonly active?: number;
  readonly fileMobil?: string;
  readonly validFrom?: Date;
  readonly validUntil?: Date;
}
