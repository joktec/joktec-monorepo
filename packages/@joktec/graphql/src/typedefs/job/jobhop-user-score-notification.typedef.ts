import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopUserScoreNotification extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => Int, {
    nullable: true,
  })
  sent: number;

  @Field(() => Int, {
    nullable: true,
  })
  stopped: number;

  @Field(() => String, {
    nullable: true,
  })
  createdAt: Date;

  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => Int, {
    nullable: true,
  })
  scoreNotificationId: number;
}

@ObjectType()
export class JobhopUserScoreNotificationDetail extends JobhopUserScoreNotification {}

@ObjectType()
export class JobhopUserScoreNotificationListResponse extends BaseListResponse({
  viewDto: JobhopUserScoreNotification,
}) {}
