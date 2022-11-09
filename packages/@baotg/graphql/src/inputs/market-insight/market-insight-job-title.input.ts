import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseMarketInsightJobTitleInput {
  @Field(() => String, {
    nullable: true,
  })
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  function!: string;

  @Field(() => String, {
    nullable: true,
  })
  isTop!: number;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  trendingFunctionPriority!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isTrendingFunction!: number;

  @Field(() => String, {
    nullable: true,
  })
  trendingFunctionName!: string;

  @Field(() => String, {
    nullable: true,
  })
  trendingFunctionIcon!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTitleVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  trendingFunctionNameVi!: string;

  @Field(() => Int, {
    nullable: true,
  })
  averageSalary!: number;
}

@InputType()
export class CreateMarketInsightJobTitleInput extends BaseMarketInsightJobTitleInput {}

@InputType()
export class UpdateMarketInsightJobTitleInput extends BaseMarketInsightJobTitleInput {
  @Field()
  id!: string;
}

@InputType()
export class MarketInsightJobTitlePaginationInput extends BasePaginationInput {}

@InputType()
export class MarketInsightJobTitleConditionInput extends BaseConditionInput {}

@InputType()
export class MarketInsightJobTitleQueryInput extends BaseQueryInput({
  conditionInput: MarketInsightJobTitleConditionInput,
  paginationInput: MarketInsightJobTitlePaginationInput,
})<MarketInsightJobTitleConditionInput, MarketInsightJobTitlePaginationInput> {}
