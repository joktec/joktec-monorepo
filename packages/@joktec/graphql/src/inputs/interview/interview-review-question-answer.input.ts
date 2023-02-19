import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseInterviewReviewQuestionAnswerInput {
  @Field(() => String, {
    nullable: true,
  })
  answer: string;

  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId: string;

  @Field(() => Int, {
    nullable: true,
  })
  questionId: number;
}

@InputType()
export class CreateInterviewReviewQuestionAnswerInput extends BaseInterviewReviewQuestionAnswerInput {}

@InputType()
export class UpdateInterviewReviewQuestionAnswerInput extends BaseInterviewReviewQuestionAnswerInput {
  @Field()
  id!: string;
}

@InputType()
export class InterviewReviewQuestionAnswerPaginationInput extends BasePaginationInput {}

@InputType()
export class InterviewReviewQuestionAnswerConditionInput extends BaseConditionInput {}

@InputType()
export class InterviewReviewQuestionAnswerQueryInput extends BaseQueryInput({
  conditionInput: InterviewReviewQuestionAnswerConditionInput,
  paginationInput: InterviewReviewQuestionAnswerPaginationInput,
})<InterviewReviewQuestionAnswerConditionInput, InterviewReviewQuestionAnswerPaginationInput> {}
