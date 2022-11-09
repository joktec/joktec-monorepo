import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class InterviewReviewComment extends BaseTypedef {
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

@ObjectType()
export class InterviewReviewCommentDetail extends InterviewReviewComment {}

@ObjectType()
export class InterviewReviewCommentListReponse extends BaseListResponse({
  viewDto: InterviewReviewComment,
}) {}
