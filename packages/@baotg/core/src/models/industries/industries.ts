import { BaseModel } from '../base.model';

// export enum IndustryMessagePattern {
//   COMMON_INDUSTRY_LIST = 'COMMON_INDUSTRY_LIST',
//   COMMON_INDUSTRY_GET = 'COMMON_INDUSTRY_GET',
//   COMMON_INDUSTRY_CREATE = 'COMMON_INDUSTRY_CREATE',
//   COMMON_INDUSTRY_UPDATE = 'COMMON_INDUSTRY_UPDATE',
//   COMMON_INDUSTRY_DELETE = 'COMMON_INDUSTRY_DELETE',
// }

export interface Industry extends BaseModel {
  readonly name?: string;
  readonly nameEng?: string;
  readonly code?: string;
  readonly logo?: string;
  readonly image?: string;
  readonly priority?: number;
  readonly platform?: number;
  readonly imageHighlight?: string;
  readonly isTpActive?: number;
  readonly isFptoActive?: number;
  readonly priorityTop?: number;
  readonly isFptoTop?: number;
  readonly priorityFooter?: number;
  readonly hlLogo?: string;
  readonly hlLogoColor?: string;
  readonly hlImage?: string;
  readonly hlImageHighlight?: string;
  readonly priorityHighlight?: number;
  readonly priorityHighlightFpto?: number;
  readonly urlCode?: string;
}
