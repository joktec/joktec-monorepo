import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobSubscriptionHistory extends BaseTypedef {
  @Field(() => String, { nullable: true })
  jobName: string;

  @Field(() => String, { nullable: true })
  prevJobType: string;

  @Field(() => String, { nullable: true })
  curJobType: string;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  userEmail: string;

  @Field(() => String, { nullable: true })
  jobIdId: string;
}

@ObjectType()
export class JobSubscriptionHistoryDetail extends JobSubscriptionHistory {}

@ObjectType()
export class JobSubscriptionHistoryListResponse extends BaseListResponse({
  viewDto: JobSubscriptionHistory,
}) {}
