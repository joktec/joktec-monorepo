import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class InterviewReviewQuestionAnswer extends BaseTypedef {
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
  answer: string;

  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId: string;

  @Field(() => Int, {
    nullable: true,
  })
  questionId: number;
}

@ObjectType()
export class InterviewReviewQuestionAnswerDetail extends InterviewReviewQuestionAnswer {}

@ObjectType()
export class InterviewReviewQuestionAnswerListReponse extends BaseListResponse({
  viewDto: InterviewReviewQuestionAnswer,
}) {}
