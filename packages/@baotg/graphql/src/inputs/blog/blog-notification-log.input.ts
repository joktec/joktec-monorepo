import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseBlogNotificationLogInput {
  @Field(() => String, {
    nullable: true,
  })
  notificationType: string;

  @Field(() => Int, {
    nullable: true,
  })
  postId: number;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => String, {
    nullable: true,
  })
  registrationId: string;

  @Field(() => Int, {
    nullable: true,
  })
  deviceId: number;

  @Field(() => String, {
    nullable: true,
  })
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  content: string;

  @Field(() => String, {
    nullable: true,
  })
  language: string;

  @Field(() => Int, {
    nullable: true,
  })
  clicked: number;

  @Field(() => String, {
    nullable: true,
  })
  sentAt: Date;

  @Field(() => Int, {
    nullable: true,
  })
  isSuccess: number;
}

@InputType()
export class CreateBlogNotificationLogInput extends BaseBlogNotificationLogInput {}

@InputType()
export class UpdateBlogNotificationLogInput extends BaseBlogNotificationLogInput {
  @Field()
  id!: string;
}

@InputType()
export class BlogNotificationLogPaginationInput extends BasePaginationInput {}

@InputType()
export class BlogNotificationLogConditionInput extends BaseConditionInput {}

@InputType()
export class BlogNotificationLogQueryInput extends BaseQueryInput({
  conditionInput: BlogNotificationLogConditionInput,
  paginationInput: BlogNotificationLogPaginationInput,
})<BlogNotificationLogConditionInput, BlogNotificationLogPaginationInput> {}
