import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobStats extends BaseTypedef {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => Number, { nullable: true })
  totalCount: number;

  @Field(() => Number, { nullable: true })
  jhCount: number;

  @Field(() => Number, { nullable: true })
  vneCount: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  organizationId: string;
}

@ObjectType()
export class JobStatsObjectDetail extends JobStats {}

@ObjectType()
export class JobStatsListResponse extends BaseListResponse({
  viewDto: JobStats,
}) {}
