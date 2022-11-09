import { BaseDto, BaseListResponseDto } from '../base.dto';

export class MarketingSeoKeywordDto extends BaseDto {
  readonly keyword?: string;
  readonly templateName?: string;
}

// tslint:disable-next-line:max-line-length
export class MarketingSeoKeywordListResponseDto extends BaseListResponseDto<MarketingSeoKeywordDto> {}
