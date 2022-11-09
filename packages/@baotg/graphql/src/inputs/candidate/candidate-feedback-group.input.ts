import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateFeedbackGroupInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;
}

@InputType()
export class CreateCandidateFeedbackGroupInput extends BaseCandidateFeedbackGroupInput {}

@InputType()
export class UpdateCandidateFeedbackGroupInput extends BaseCandidateFeedbackGroupInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateFeedbackGroupPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateFeedbackGroupConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateFeedbackGroupQueryInput extends BaseQueryInput({
  conditionInput: CandidateFeedbackGroupConditionInput,
  paginationInput: CandidateFeedbackGroupPaginationInput,
})<CandidateFeedbackGroupConditionInput, CandidateFeedbackGroupPaginationInput> {}
