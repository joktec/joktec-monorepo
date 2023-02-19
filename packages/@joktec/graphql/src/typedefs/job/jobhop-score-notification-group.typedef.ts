import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopScoreNotificationGroup extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name: string;
}

@ObjectType()
export class JobhopScoreNotificationGroupDetail extends JobhopScoreNotificationGroup {}

@ObjectType()
export class JobhopScoreNotificationGroupListResponse extends BaseListResponse({
  viewDto: JobhopScoreNotificationGroup,
}) {}
