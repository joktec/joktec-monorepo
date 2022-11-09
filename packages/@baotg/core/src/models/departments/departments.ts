import { BaseModel } from '../base.model';

// export enum DepartmentMessagePattern {
//   COMMON_DEPARTMENT_LIST = 'COMMON_DEPARTMENT_LIST',
//   COMMON_DEPARTMENT_GET = 'COMMON_DEPARTMENT_GET',
//   COMMON_DEPARTMENT_CREATE = 'COMMON_DEPARTMENT_CREATE',
//   COMMON_DEPARTMENT_UPDATE = 'COMMON_DEPARTMENT_UPDATE',
//   COMMON_DEPARTMENT_DELETE = 'COMMON_DEPARTMENT_DELETE',
// }

export interface Department extends BaseModel {
  readonly name?: string;
  readonly nameEng?: string;
  readonly priority?: number;

  // * Migration fields
  readonly departmentId?: string;
}
