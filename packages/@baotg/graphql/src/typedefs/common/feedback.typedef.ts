import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '..';

@ObjectType()
export class Creator {
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  fullName: string;

  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  username: string;
}

@ObjectType()
export class Feedback extends BaseTypedef {
  @Field(() => String, { nullable: true })
  actor: string;

  @Field(() => Creator, { nullable: true })
  creator: Creator;

  @Field(() => String, { nullable: true })
  candidateId: string;

  @Field(() => String, { nullable: true })
  createBy: string;

  @Field(() => String, { nullable: true })
  createDate: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  lastUpdate: string;

  @Field(() => String, { nullable: true })
  rate: string;

  @Field(() => String, { nullable: true })
  updateBy: string;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  feedbackType: string;

  @Field(() => Number, { nullable: true })
  rating: number;

  @Field(() => String, { nullable: true })
  deleted: string;

  @Field(() => Number, { nullable: true })
  platform: number;

  @Field(() => String, { nullable: true })
  feedbackAi: string;

  @Field(() => [String], { nullable: true })
  feedbackData: string[];

  @Field(() => String, { nullable: true })
  usersAreMentioned: string;
}

@ObjectType()
export class FeedbackDetail extends Feedback {}

@ObjectType()
export class FeedbackListResponse extends BaseListResponse({
  viewDto: Feedback,
}) {}
