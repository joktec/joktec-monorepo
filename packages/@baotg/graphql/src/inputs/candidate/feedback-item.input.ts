import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '..';

@InputType()
export class BaseFeedbackItemInput {
  @Field(() => String, { nullable: true })
  actor: string;

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

@InputType()
export class CreateFeedbackItemInput extends BaseFeedbackItemInput {}

@InputType()
export class UpdateFeedbackItemInput extends BaseFeedbackItemInput {
  @Field()
  id!: string;
}

@InputType()
export class FeedbackItemPaginationInput extends BasePaginationInput {
  @Field(() => Number, { nullable: true })
  sqlId: number;
}

@InputType()
export class FeedbackItemConditionInput extends BaseConditionInput {
  @Field(() => String, { nullable: true })
  candidateId: string;

  @Field(() => Number, { nullable: true })
  level: number;
}

@InputType()
export class FeedbackItemQueryInput extends BaseQueryInput({
  conditionInput: FeedbackItemConditionInput,
  paginationInput: FeedbackItemPaginationInput,
})<FeedbackItemConditionInput, FeedbackItemPaginationInput> {}
