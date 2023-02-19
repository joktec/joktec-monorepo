import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class BlogNotificationLog extends BaseTypedef {
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

@ObjectType()
export class BlogNotificationLogDetail extends BlogNotificationLog {}

@ObjectType()
export class BlogNotificationLogListReponse extends BaseListResponse({
  viewDto: BlogNotificationLog,
}) {}
