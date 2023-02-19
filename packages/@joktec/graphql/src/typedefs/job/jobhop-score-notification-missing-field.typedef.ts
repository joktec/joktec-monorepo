import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopScoreNotificationMissingField extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => Int, {
    nullable: true,
  })
  groupId: number;
}

@ObjectType()
export class JobhopScoreNotificationMissingFieldDetail extends JobhopScoreNotificationMissingField {}

@ObjectType()
export class JobhopScoreNotificationMissingFieldListResponse extends BaseListResponse({
  viewDto: JobhopScoreNotificationMissingField,
}) {}
