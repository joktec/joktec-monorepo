import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseInterviewReviewInput {
  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle: string;

  @Field(() => String, {
    nullable: true,
  })
  overallExperience: string;

  @Field(() => String, {
    nullable: true,
  })
  offerStatus: string;

  @Field(() => String, {
    nullable: true,
  })
  interviewDate: Date;

  @Field(() => Int, {
    nullable: true,
  })
  isAnonymous: number;

  @Field(() => Int, {
    nullable: true,
  })
  isSentNotification: number;

  @Field(() => String, {
    nullable: true,
  })
  tipToShare: string;

  @Field(() => String, {
    nullable: true,
  })
  rejectReason: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId: string;

  @Field(() => String, {
    nullable: true,
  })
  prevStatus: string;

  @Field(() => String, {
    nullable: true,
  })
  status: string;
}

@InputType()
export class CreateInterviewReviewInput extends BaseInterviewReviewInput {}

@InputType()
export class UpdateInterviewReviewInput extends BaseInterviewReviewInput {
  @Field()
  id!: string;
}

@InputType()
export class InterviewReviewPaginationInput extends BasePaginationInput {}

@InputType()
export class InterviewReviewConditionInput extends BaseConditionInput {}

@InputType()
export class InterviewReviewQueryInput extends BaseQueryInput({
  conditionInput: InterviewReviewConditionInput,
  paginationInput: InterviewReviewPaginationInput,
})<InterviewReviewConditionInput, InterviewReviewPaginationInput> {}
