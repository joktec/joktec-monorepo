import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseMarketingBannerInput implements IBaseInput {
  @IsNotEmpty()
  file!: string;

  @IsNotEmpty()
  lang!: string;

  redirectLink!: string;

  bannerType!: string;

  bannerPosition!: string;

  marketingLocation!: string;

  page!: string;

  @IsNotEmpty()
  validFrom!: Date;

  @IsNotEmpty()
  validUntil!: Date;

  active!: number;

  isTest!: number;
}

export class CreateMarketingBannerInput extends BaseMarketingBannerInput implements IBaseCreateInput {}

export class UpdateMarketingBannerInput extends BaseMarketingBannerInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class MarketingBannerPaginationInput extends BasePaginationInput {}

export class MarketingBannerConditionInput extends BaseConditionInput {}

export class MarketingBannerQueryInput extends BaseQueryInput<
  MarketingBannerConditionInput,
  MarketingBannerPaginationInput
> {}
