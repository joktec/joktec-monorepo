import { BaseModel } from '../base.model';

// export enum UniversityMessagePattern {
//   COMMON_UNIVERSITY_LIST = 'COMMON_UNIVERSITY_LIST',
//   COMMON_UNIVERSITY_GET = 'COMMON_UNIVERSITY_GET',
//   COMMON_UNIVERSITY_CREATE = 'COMMON_UNIVERSITY_CREATE',
//   COMMON_UNIVERSITY_UPDATE = 'COMMON_UNIVERSITY_UPDATE',
//   COMMON_UNIVERSITY_DELETE = 'COMMON_UNIVERSITY_DELETE',
// }

export interface University extends BaseModel {
  readonly name?: string;
  readonly nameEng?: string;
}
