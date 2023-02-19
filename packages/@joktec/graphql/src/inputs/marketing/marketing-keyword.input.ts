import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseMarketingKeywordInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  keywordType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;
}

@InputType()
export class CreateMarketingKeywordInput extends BaseMarketingKeywordInput {}

@InputType()
export class UpdateMarketingKeywordInput extends BaseMarketingKeywordInput {
  @Field()
  id!: string;
}

@InputType()
export class MarketingKeywordPaginationInput extends BasePaginationInput {}

@InputType()
export class MarketingKeywordConditionInput extends BaseConditionInput {}

@InputType()
export class MarketingKeywordQueryInput extends BaseQueryInput({
  conditionInput: MarketingKeywordConditionInput,
  paginationInput: MarketingKeywordPaginationInput,
})<MarketingKeywordConditionInput, MarketingKeywordPaginationInput> {}
