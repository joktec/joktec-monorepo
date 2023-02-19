import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopUserScoreSentNotification extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt: Date;

  @Field(() => Int, {
    nullable: true,
  })
  scoreNotificationId: number;

  @Field(() => Int, {
    nullable: true,
  })
  clicked: number;
}

@ObjectType()
export class JobhopUserScoreSentNotificationDetail extends JobhopUserScoreSentNotification {}

@ObjectType()
export class JobhopUserScoreSentNotificationListResponse extends BaseListResponse({
  viewDto: JobhopUserScoreSentNotification,
}) {}
