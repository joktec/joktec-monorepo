import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobStatsInput {
  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
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

@InputType()
export class CreateJobStatsInput extends BaseJobStatsInput {}

@InputType()
export class UpdateJobStatsInput extends BaseJobStatsInput {
  @Field()
  id!: string;
}

@InputType()
export class JobStatsPaginationInput extends BasePaginationInput {}

@InputType()
export class JobStatsConditionInput extends BaseConditionInput {}

@InputType()
export class JobStatsQueryInput extends BaseQueryInput({
  conditionInput: JobStatsConditionInput,
  paginationInput: JobStatsPaginationInput,
})<JobStatsConditionInput, JobStatsPaginationInput> {}
