import { BaseModel } from '../base.model';

// export enum SourceMessagePattern {
//   COMMON_SOURCE_LIST = 'COMMON_SOURCE_LIST',
//   COMMON_SOURCE_GET = 'COMMON_SOURCE_GET',
//   COMMON_SOURCE_CREATE = 'COMMON_SOURCE_CREATE',
//   COMMON_SOURCE_UPDATE = 'COMMON_SOURCE_UPDATE',
//   COMMON_SOURCE_DELETE = 'COMMON_SOURCE_DELETE',
// }

export interface Source extends BaseModel {
  readonly name?: string;
  readonly code?: string;
}
