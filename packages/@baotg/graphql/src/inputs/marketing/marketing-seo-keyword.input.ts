import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseMarketingSeoKeywordInput {
  @Field(() => String, {
    nullable: true,
  })
  keyword!: string;

  @Field(() => String, {
    nullable: true,
  })
  templateName!: string;
}

@InputType()
export class CreateMarketingSeoKeywordInput extends BaseMarketingSeoKeywordInput {}

@InputType()
export class UpdateMarketingSeoKeywordInput extends BaseMarketingSeoKeywordInput {
  @Field()
  id!: string;
}

@InputType()
export class MarketingSeoKeywordPaginationInput extends BasePaginationInput {}

@InputType()
export class MarketingSeoKeywordConditionInput extends BaseConditionInput {}

@InputType()
export class MarketingSeoKeywordQueryInput extends BaseQueryInput({
  conditionInput: MarketingSeoKeywordConditionInput,
  paginationInput: MarketingSeoKeywordPaginationInput,
})<MarketingSeoKeywordConditionInput, MarketingSeoKeywordPaginationInput> {}
