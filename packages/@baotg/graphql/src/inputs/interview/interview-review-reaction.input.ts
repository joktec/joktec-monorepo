import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseInterviewReviewReactionInput {
  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @Field(() => String, {
    nullable: true,
  })
  reactionType: string;

  @Field(() => String, {
    nullable: true,
  })
  type: string;

  @Field(() => Int, {
    nullable: true,
  })
  interviewReviewId: number;

  @Field(() => Int, {
    nullable: true,
  })
  interviewReviewCommentId: number;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId: string;
}

@InputType()
export class CreateInterviewReviewReactionInput extends BaseInterviewReviewReactionInput {}

@InputType()
export class UpdateInterviewReviewReactionInput extends BaseInterviewReviewReactionInput {
  @Field()
  id!: string;
}

@InputType()
export class InterviewReviewReactionPaginationInput extends BasePaginationInput {}

@InputType()
export class InterviewReviewReactionConditionInput extends BaseConditionInput {}

@InputType()
export class InterviewReviewReactionQueryInput extends BaseQueryInput({
  conditionInput: InterviewReviewReactionConditionInput,
  paginationInput: InterviewReviewReactionPaginationInput,
})<InterviewReviewReactionConditionInput, InterviewReviewReactionPaginationInput> {}
