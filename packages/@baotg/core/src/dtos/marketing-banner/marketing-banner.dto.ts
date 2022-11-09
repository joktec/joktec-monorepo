import { BaseDto, BaseListResponseDto } from '../base.dto';

export class MarketingBannerDto extends BaseDto {
  readonly file?: string;
  readonly lang?: string;
  readonly redirectLink?: string;
  readonly bannerType?: string;
  readonly bannerPosition?: string;
  readonly marketingLocation?: string;
  readonly page?: string;
  readonly validFrom?: Date;
  readonly validUntil?: Date;
  readonly active?: number;
  readonly isTest?: number;
}

export class MarketingBannerListResponseDto extends BaseListResponseDto<MarketingBannerDto> {}
