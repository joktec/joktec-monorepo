import { Field, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateFeedbackItemContentInput {
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
export class CreateCandidateFeedbackItemContentInput extends BaseCandidateFeedbackItemContentInput {}

@InputType()
export class UpdateCandidateFeedbackItemContentInput extends BaseCandidateFeedbackItemContentInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateFeedbackItemContentPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateFeedbackItemContentConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateFeedbackItemContentQueryInput extends BaseQueryInput({
  conditionInput: CandidateFeedbackItemContentConditionInput,
  paginationInput: CandidateFeedbackItemContentPaginationInput,
})<CandidateFeedbackItemContentConditionInput, CandidateFeedbackItemContentPaginationInput> {}
