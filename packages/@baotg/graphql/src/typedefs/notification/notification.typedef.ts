import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class Notification extends BaseTypedef {
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

@ObjectType()
export class NotificationDetail extends Notification {}

@ObjectType()
export class NotificationListReponse extends BaseListResponse({
  viewDto: Notification,
}) {}
