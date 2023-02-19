import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseNotificationLogInput {
  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  body!: string;

  @Field(() => String, {
    nullable: true,
  })
  notificationType!: string;

  @Field(() => String, {
    nullable: true,
  })
  actionId!: string;

  @Field(() => String, {
    nullable: true,
  })
  objectId!: string;

  @Field(() => String, {
    nullable: true,
  })
  subObjectId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isSuccess!: number;

  @Field(() => String, {
    nullable: true,
  })
  messageId!: string;

  @Field(() => String, {
    nullable: true,
  })
  lang!: string;

  @Field(() => String, {
    nullable: true,
  })
  sentAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@InputType()
export class CreateNotificationLogInput extends BaseNotificationLogInput {}

@InputType()
export class UpdateNotificationLogInput extends BaseNotificationLogInput {
  @Field()
  id!: string;
}

@InputType()
export class NotificationLogPaginationInput extends BasePaginationInput {}

@InputType()
export class NotificationLogConditionInput extends BaseConditionInput {}

@InputType()
export class NotificationLogQueryInput extends BaseQueryInput({
  conditionInput: NotificationLogConditionInput,
  paginationInput: NotificationLogPaginationInput,
})<NotificationLogConditionInput, NotificationLogPaginationInput> {}
