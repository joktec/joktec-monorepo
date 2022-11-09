import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class NotificationLog extends BaseTypedef {
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

@ObjectType()
export class NotificationLogDetail extends NotificationLog {}

@ObjectType()
export class NotificationLogListReponse extends BaseListResponse({
  viewDto: NotificationLog,
}) {}
