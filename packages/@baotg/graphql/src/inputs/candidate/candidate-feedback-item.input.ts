import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateFeedbackItemInput {
  @Field(() => Int, {
    nullable: true,
  })
  level!: number;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  inputType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  groupId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  parentId!: number;
}

@InputType()
export class CreateCandidateFeedbackItemInput extends BaseCandidateFeedbackItemInput {}

@InputType()
export class UpdateCandidateFeedbackItemInput extends BaseCandidateFeedbackItemInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateFeedbackItemPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateFeedbackItemConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateFeedbackItemQueryInput extends BaseQueryInput({
  conditionInput: CandidateFeedbackItemConditionInput,
  paginationInput: CandidateFeedbackItemPaginationInput,
})<CandidateFeedbackItemConditionInput, CandidateFeedbackItemPaginationInput> {}
