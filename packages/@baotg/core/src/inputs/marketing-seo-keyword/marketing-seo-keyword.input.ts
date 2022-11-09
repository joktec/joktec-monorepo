import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseMarketingSeoKeywordInput implements IBaseInput {
  @IsNotEmpty()
  keyword!: string;

  @IsNotEmpty()
  templateName!: string;
}

export class CreateMarketingSeoKeywordInput extends BaseMarketingSeoKeywordInput implements IBaseCreateInput {}

export class UpdateMarketingSeoKeywordInput extends BaseMarketingSeoKeywordInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class MarketingSeoKeywordPaginationInput extends BasePaginationInput {}

export class MarketingSeoKeywordConditionInput extends BaseConditionInput {}

export class MarketingSeoKeywordQueryInput extends BaseQueryInput<
  MarketingSeoKeywordConditionInput,
  MarketingSeoKeywordPaginationInput
> {}
