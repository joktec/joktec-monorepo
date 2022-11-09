import { BaseDto, BaseListResponseDto } from '../base.dto';

export class IndustryDto extends BaseDto {
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

export class IndustryListResponseDto extends BaseListResponseDto<IndustryDto> {}
