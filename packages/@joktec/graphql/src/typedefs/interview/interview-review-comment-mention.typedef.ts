import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class InterviewReviewCommentMention extends BaseTypedef {
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

@ObjectType()
export class InterviewReviewCommentMentionDetail extends InterviewReviewCommentMention {}

@ObjectType()
export class InterviewReviewCommentMentionListReponse extends BaseListResponse({
  viewDto: InterviewReviewCommentMention,
}) {}
