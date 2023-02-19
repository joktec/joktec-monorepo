import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class InterviewReview extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  sqlId: string;

  @Field(() => Int, {
    nullable: true,
  })
  isDeleted: number;

  @Field(() => String, {
    nullable: true,
  })
  createdAt: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt: Date;

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

@ObjectType()
export class InterviewReviewDetail extends InterviewReview {}

@ObjectType()
export class InterviewReviewListReponse extends BaseListResponse({
  viewDto: InterviewReview,
}) {}
