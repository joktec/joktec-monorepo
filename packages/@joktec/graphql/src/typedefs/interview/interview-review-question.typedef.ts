import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class InterviewReviewQuestion extends BaseTypedef {
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
  question: string;

  @Field(() => Int, {
    nullable: true,
  })
  interviewReviewId: number;
}

@ObjectType()
export class InterviewReviewQuestionDetail extends InterviewReviewQuestion {}

@ObjectType()
export class InterviewReviewQuestionListReponse extends BaseListResponse({
  viewDto: InterviewReviewQuestion,
}) {}
