import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseMarketingSeoKeywordInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  keyword!: string;

  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  templateName!: string;
}

@InputType()
export class CreateMarketingSeoKeywordInput extends BaseMarketingSeoKeywordInput {}

@InputType()
export class UpdateMarketingSeoKeywordInput extends BaseMarketingSeoKeywordInput {
  // @Field()
  // id!: string;
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
