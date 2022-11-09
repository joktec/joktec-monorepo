import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobTitleSalaryRange extends BaseTypedef {
  @Field(() => String, { nullable: true })
  jobTitle: string;

  @Field(() => Number, { nullable: true })
  salaryMin: number;

  @Field(() => Number, { nullable: true })
  salaryMax: number;
}

@ObjectType()
export class JobTitleSalaryRangeDetail extends JobTitleSalaryRange {}

@ObjectType()
export class JobTitleSalaryRangeListResponse extends BaseListResponse({
  viewDto: JobTitleSalaryRange,
}) {}
