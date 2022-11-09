import { BaseModel } from '../base.model';

// export enum DegreeMessagePattern {
//   COMMON_DEGREE_LIST = 'COMMON_DEGREE_LIST',
//   COMMON_DEGREE_GET = 'COMMON_DEGREE_GET',
//   COMMON_DEGREE_CREATE = 'COMMON_DEGREE_CREATE',
//   COMMON_DEGREE_UPDATE = 'COMMON_DEGREE_UPDATE',
//   COMMON_DEGREE_DELETE = 'COMMON_DEGREE_DELETE',
// }

export interface Degree extends BaseModel {
  readonly name?: string;
  readonly code?: string;
}
