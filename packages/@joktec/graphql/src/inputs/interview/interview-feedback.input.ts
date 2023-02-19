import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseInterviewFeedbackInput {
  @Field(() => String, {
    nullable: true,
  })
  candidateId: string;

  @Field(() => String, {
    nullable: true,
  })
  interviewId: string;

  @Field(() => Int, {
    nullable: true,
  })
  rating: number;

  @Field(() => String, {
    nullable: true,
  })
  comment: string;
}

@InputType()
export class CreateInterviewFeedbackInput extends BaseInterviewFeedbackInput {}

@InputType()
export class UpdateInterviewFeedbackInput extends BaseInterviewFeedbackInput {
  @Field()
  id!: string;
}

@InputType()
export class InterviewFeedbackPaginationInput extends BasePaginationInput {}

@InputType()
export class InterviewFeedbackConditionInput extends BaseConditionInput {}

@InputType()
export class InterviewFeedbackQueryInput extends BaseQueryInput({
  conditionInput: InterviewFeedbackConditionInput,
  paginationInput: InterviewFeedbackPaginationInput,
})<InterviewFeedbackConditionInput, InterviewFeedbackPaginationInput> {}
