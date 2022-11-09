import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseInterviewReviewCommentInput {
  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @Field(() => String, {
    nullable: true,
  })
  comment: string;

  @Field(() => Int, {
    nullable: true,
  })
  interviewReviewId: number;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId: string;

  @Field(() => Int, {
    nullable: true,
  })
  parentId: number;
}

@InputType()
export class CreateInterviewReviewCommentInput extends BaseInterviewReviewCommentInput {}

@InputType()
export class UpdateInterviewReviewCommentInput extends BaseInterviewReviewCommentInput {
  @Field()
  id!: string;
}

@InputType()
export class InterviewReviewCommentPaginationInput extends BasePaginationInput {}

@InputType()
export class InterviewReviewCommentConditionInput extends BaseConditionInput {}

@InputType()
export class InterviewReviewCommentQueryInput extends BaseQueryInput({
  conditionInput: InterviewReviewCommentConditionInput,
  paginationInput: InterviewReviewCommentPaginationInput,
})<InterviewReviewCommentConditionInput, InterviewReviewCommentPaginationInput> {}
