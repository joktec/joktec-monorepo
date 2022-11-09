import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobStatsDetail extends BaseTypedef {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  platform: number;

  @Field(() => String, { nullable: true })
  createDate: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  organizationId: string;
}

@ObjectType()
export class JobStatsDetailDetail extends JobStatsDetail {}

@ObjectType()
export class JobStatsDetailListResponse extends BaseListResponse({
  viewDto: JobStatsDetail,
}) {}
