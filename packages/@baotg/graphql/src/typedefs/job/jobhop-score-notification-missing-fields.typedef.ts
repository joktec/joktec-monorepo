import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopScoreNotificationMissingFields extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  scorenotificationId: number;

  @Field(() => Int, {
    nullable: true,
  })
  scorenotificationmissingfieldId: number;
}

@ObjectType()
export class JobhopScoreNotificationMissingFieldsDetail extends JobhopScoreNotificationMissingFields {}

@ObjectType()
export class JobhopScoreNotificationMissingFieldsListResponse extends BaseListResponse({
  viewDto: JobhopScoreNotificationMissingFields,
}) {}
