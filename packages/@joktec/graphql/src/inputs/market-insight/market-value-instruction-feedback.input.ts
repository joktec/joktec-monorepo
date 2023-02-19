import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseMarketValueInstructionFeedbackInput {
  @Field(() => Int, {
    nullable: true,
  })
  isHelpful!: number;

  @Field(() => String, {
    nullable: true,
  })
  unhelpfulReason!: string;

  @Field(() => String, {
    nullable: true,
  })
  feedback!: string;
}

@InputType()
export class CreateMarketValueInstructionFeedbackInput extends BaseMarketValueInstructionFeedbackInput {}

@InputType()
export class UpdateMarketValueInstructionFeedbackInput extends BaseMarketValueInstructionFeedbackInput {
  @Field()
  id!: string;
}

@InputType()
export class MarketValueInstructionFeedbackPaginationInput extends BasePaginationInput {}

@InputType()
export class MarketValueInstructionFeedbackConditionInput extends BaseConditionInput {}

@InputType()
export class MarketValueInstructionFeedbackQueryInput extends BaseQueryInput({
  conditionInput: MarketValueInstructionFeedbackConditionInput,
  paginationInput: MarketValueInstructionFeedbackPaginationInput,
})<MarketValueInstructionFeedbackConditionInput, MarketValueInstructionFeedbackPaginationInput> {}
