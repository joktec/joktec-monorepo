import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseInterviewReviewCommentMentionInput {
  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @Field(() => Int, {
    nullable: true,
  })
  location: number;

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
export class CreateInterviewReviewCommentMentionInput extends BaseInterviewReviewCommentMentionInput {}

@InputType()
export class UpdateInterviewReviewCommentMentionInput extends BaseInterviewReviewCommentMentionInput {
  @Field()
  id!: string;
}

@InputType()
export class InterviewReviewCommentMentionPaginationInput extends BasePaginationInput {}

@InputType()
export class InterviewReviewCommentMentionConditionInput extends BaseConditionInput {}

@InputType()
export class InterviewReviewCommentMentionQueryInput extends BaseQueryInput({
  conditionInput: InterviewReviewCommentMentionConditionInput,
  paginationInput: InterviewReviewCommentMentionPaginationInput,
})<InterviewReviewCommentMentionConditionInput, InterviewReviewCommentMentionPaginationInput> {}
