import { Field, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateFeedbackGroupContentInput {
  @Field(() => String, {
    nullable: true,
  })
  lang!: string;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  items!: object;

  @Field(() => Int, {
    nullable: true,
  })
  candidatefeedbackitemId!: number;
}

@InputType()
export class CreateCandidateFeedbackGroupContentInput extends BaseCandidateFeedbackGroupContentInput {}

@InputType()
export class UpdateCandidateFeedbackGroupContentInput extends BaseCandidateFeedbackGroupContentInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateFeedbackGroupContentPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateFeedbackGroupContentConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateFeedbackGroupContentQueryInput extends BaseQueryInput({
  conditionInput: CandidateFeedbackGroupContentConditionInput,
  paginationInput: CandidateFeedbackGroupContentPaginationInput,
})<CandidateFeedbackGroupContentConditionInput, CandidateFeedbackGroupContentPaginationInput> {}
