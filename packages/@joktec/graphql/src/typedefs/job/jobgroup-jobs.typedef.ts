import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobGroupJobs extends BaseTypedef {
  @Field(() => String, { nullable: true })
  jobgroupId: number;

  @Field(() => String, { nullable: true })
  jobId: string;
}

@ObjectType()
export class JobGroupJobsDetail extends JobGroupJobs {}

@ObjectType()
export class JobGroupJobsListResponse extends BaseListResponse({
  viewDto: JobGroupJobs,
}) {}
