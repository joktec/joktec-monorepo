import { BaseDto, BaseListResponseDto } from '../base.dto';

export class MarketingKeywordDto extends BaseDto {
  readonly name?: string;
  readonly nameEng?: string;
  readonly link?: string;
  readonly keywordType?: string;
  readonly priority?: number;
}

export class MarketingKeywordListResponseDto extends BaseListResponseDto<MarketingKeywordDto> {}
