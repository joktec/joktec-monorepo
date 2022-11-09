import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class InterviewReviewReaction extends BaseTypedef {
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

@ObjectType()
export class InterviewReviewReactionDetail extends InterviewReviewReaction {}

@ObjectType()
export class InterviewReviewReactionListReponse extends BaseListResponse({
  viewDto: InterviewReviewReaction,
}) {}
