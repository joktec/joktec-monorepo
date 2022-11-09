import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopUserActivity extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated: Date;

  @Field(() => Int, {
    nullable: true,
  })
  platform: number;

  @Field(() => String, {
    nullable: true,
  })
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  extraData: string;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => String, {
    nullable: true,
  })
  eventType: string;
}

@ObjectType()
export class JobhopUserActivityDetail extends JobhopUserActivity {}

@ObjectType()
export class JobhopUserActivityListResponse extends BaseListResponse({
  viewDto: JobhopUserActivity,
}) {}
