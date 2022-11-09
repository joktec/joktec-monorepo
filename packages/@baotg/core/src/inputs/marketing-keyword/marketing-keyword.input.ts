import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseMarketingKeywordInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  nameEng!: string;

  link!: string;

  keywordType!: string;

  priority!: number;
}

export class CreateMarketingKeywordInput extends BaseMarketingKeywordInput implements IBaseCreateInput {}

export class UpdateMarketingKeywordInput extends BaseMarketingKeywordInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class MarketingKeywordPaginationInput extends BasePaginationInput {}

export class MarketingKeywordConditionInput extends BaseConditionInput {}

export class MarketingKeywordQueryInput extends BaseQueryInput<
  MarketingKeywordConditionInput,
  MarketingKeywordPaginationInput
> {}
