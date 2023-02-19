import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseMarketInsightJobTitleVoteInput {
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
  identityId!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  feedback!: string;

  @Field(() => Int, {
    nullable: true,
  })
  vote!: number;
}

@InputType()
export class CreateMarketInsightJobTitleVoteInput extends BaseMarketInsightJobTitleVoteInput {}

@InputType()
export class UpdateMarketInsightJobTitleVoteInput extends BaseMarketInsightJobTitleVoteInput {
  @Field()
  id!: string;
}

@InputType()
export class MarketInsightJobTitleVotePaginationInput extends BasePaginationInput {}

@InputType()
export class MarketInsightJobTitleVoteConditionInput extends BaseConditionInput {}

@InputType()
export class MarketInsightJobTitleVoteQueryInput extends BaseQueryInput({
  conditionInput: MarketInsightJobTitleVoteConditionInput,
  paginationInput: MarketInsightJobTitleVotePaginationInput,
})<MarketInsightJobTitleVoteConditionInput, MarketInsightJobTitleVotePaginationInput> {}
