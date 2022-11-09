import { BaseModel } from '../base.model';

// export enum CountryMessagePattern {
//   COMMON_COUNTRY_LIST = 'COMMON_COUNTRY_LIST',
//   COMMON_COUNTRY_GET = 'COMMON_COUNTRY_GET',
//   COMMON_COUNTRY_CREATE = 'COMMON_COUNTRY_CREATE',
//   COMMON_COUNTRY_UPDATE = 'COMMON_COUNTRY_UPDATE',
//   COMMON_COUNTRY_DELETE = 'COMMON_COUNTRY_DELETE',
// }
export interface Country extends BaseModel {
  readonly name?: string;
  readonly nameEng?: string;
  readonly code?: string;

  readonly countryId?: string;
}
