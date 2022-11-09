import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseInterviewReviewQuestionInput {
  @Field(() => String, {
    nullable: true,
  })
  question: string;

  @Field(() => Int, {
    nullable: true,
  })
  interviewReviewId: number;
}

@InputType()
export class CreateInterviewReviewQuestionInput extends BaseInterviewReviewQuestionInput {}

@InputType()
export class UpdateInterviewReviewQuestionInput extends BaseInterviewReviewQuestionInput {
  @Field()
  id!: string;
}

@InputType()
export class InterviewReviewQuestionPaginationInput extends BasePaginationInput {}

@InputType()
export class InterviewReviewQuestionConditionInput extends BaseConditionInput {}

@InputType()
export class InterviewReviewQuestionQueryInput extends BaseQueryInput({
  conditionInput: InterviewReviewQuestionConditionInput,
  paginationInput: InterviewReviewQuestionPaginationInput,
})<InterviewReviewQuestionConditionInput, InterviewReviewQuestionPaginationInput> {}
