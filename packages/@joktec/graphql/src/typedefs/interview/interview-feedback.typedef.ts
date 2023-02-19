import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class InterviewFeedback extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  sqlId: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId: string;

  @Field(() => String, {
    nullable: true,
  })
  interviewId: string;

  @Field(() => Int, {
    nullable: true,
  })
  rating: number;

  @Field(() => String, {
    nullable: true,
  })
  comment: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt: Date;
}

@ObjectType()
export class InterviewFeedbackDetail extends InterviewFeedback {}

@ObjectType()
export class InterviewFeedbackListReponse extends BaseListResponse({
  viewDto: InterviewFeedback,
}) {}
