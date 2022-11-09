import { BaseModel } from '../base.model';
import { Country } from '../';

// export enum CityMessagePattern {
//   COMMON_CITY_LIST = 'COMMON_CITY_LIST',
//   COMMON_CITY_GET = 'COMMON_CITY_GET',
//   COMMON_CITY_CREATE = 'COMMON_CITY_CREATE',
//   COMMON_CITY_UPDATE = 'COMMON_CITY_UPDATE',
//   COMMON_CITY_DELETE = 'COMMON_CITY_DELETE',
// }

export interface City extends BaseModel {
  readonly name?: string;
  readonly nameEng?: string;
  readonly code?: string;
  readonly country?: string | Country;
  readonly priority?: number;
  readonly prioritySearch?: number;
  readonly enabled?: number;
  readonly image?: string;
  readonly imageHighlight?: string;

  // * Migration fields
  readonly cityId?: string;
  readonly countryId?: string;
}
