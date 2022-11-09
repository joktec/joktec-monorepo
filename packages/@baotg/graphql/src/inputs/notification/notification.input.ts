import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseNotificationInput {
  @Field(() => String, {
    nullable: true,
  })
  notificationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  actorId!: string;

  @Field(() => String, {
    nullable: true,
  })
  notifierId!: string;

  @Field(() => String, {
    nullable: true,
  })
  channel!: string;

  @Field(() => String, {
    nullable: true,
  })
  channelType!: string;

  @Field(() => String, {
    nullable: true,
  })
  attributes!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isRead!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isSeen!: number;

  @Field(() => String, {
    nullable: true,
  })
  sentAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  logo!: string;

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
  actionId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  channelId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  customNotificationId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;
}

@InputType()
export class CreateNotificationInput extends BaseNotificationInput {}

@InputType()
export class UpdateNotificationInput extends BaseNotificationInput {
  @Field()
  id!: string;
}

@InputType()
export class NotificationPaginationInput extends BasePaginationInput {}

@InputType()
export class NotificationConditionInput extends BaseConditionInput {}

@InputType()
export class NotificationQueryInput extends BaseQueryInput({
  conditionInput: NotificationConditionInput,
  paginationInput: NotificationPaginationInput,
})<NotificationConditionInput, NotificationPaginationInput> {}
