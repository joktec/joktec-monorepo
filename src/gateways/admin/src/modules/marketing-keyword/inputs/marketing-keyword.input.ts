import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseMarketingKeywordInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
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
    nullable: false,
  })
  @IsNotEmpty()
  keywordType!: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority!: number;
}

@InputType()
export class CreateMarketingKeywordInput extends BaseMarketingKeywordInput {}

@InputType()
export class UpdateMarketingKeywordInput extends BaseMarketingKeywordInput {
  // @Field()
  // id!: string;
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
