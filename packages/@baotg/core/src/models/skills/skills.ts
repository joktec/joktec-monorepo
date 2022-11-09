import { BaseModel } from '../base.model';

// export enum SkillMessagePattern {
//   COMMON_SKILL_LIST = 'COMMON_SKILL_LIST',
//   COMMON_SKILL_GET = 'COMMON_SKILL_GET',
//   COMMON_SKILL_CREATE = 'COMMON_SKILL_CREATE',
//   COMMON_SKILL_UPDATE = 'COMMON_SKILL_UPDATE',
//   COMMON_SKILL_DELETE = 'COMMON_SKILL_DELETE',
// }

export interface Skill extends BaseModel {
  readonly name?: string;
  readonly code?: string;
}
