import { BaseModel } from '../base.model';

// export enum DistrictMessagePattern {
//   COMMON_DISTRICT_LIST = 'COMMON_DISTRICT_LIST',
//   COMMON_DISTRICT_GET = 'COMMON_DISTRICT_GET',
//   COMMON_DISTRICT_CREATE = 'COMMON_DISTRICT_CREATE',
//   COMMON_DISTRICT_UPDATE = 'COMMON_DISTRICT_UPDATE',
//   COMMON_DISTRICT_DELETE = 'COMMON_DISTRICT_DELETE',
// }

export interface District extends BaseModel {
  readonly code?: string;
  readonly name?: string;
  readonly nameEng?: string;
  readonly lat?: number;
  readonly lon?: number;

  readonly districtId?: string;
  readonly parentId?: string;
  readonly cityId?: string;
}
