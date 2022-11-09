import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseBannerInput implements IBaseInput {
  @IsNotEmpty()
  file!: string;

  @IsNotEmpty()
  lang!: string;

  active!: number;

  fileMobil!: string;

  @IsNotEmpty()
  validFrom!: Date;

  @IsNotEmpty()
  validUntil!: Date;
}

export class CreateBannerInput extends BaseBannerInput implements IBaseCreateInput {}

export class UpdateBannerInput extends BaseBannerInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class BannerPaginationInput extends BasePaginationInput {}

export class BannerConditionInput extends BaseConditionInput {}

export class BannerQueryInput extends BaseQueryInput<BannerConditionInput, BannerPaginationInput> {}
