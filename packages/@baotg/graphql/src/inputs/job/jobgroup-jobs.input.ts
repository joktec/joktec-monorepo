import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobGroupJobsInput {
  @Field(() => String, { nullable: true })
  jobgroupId: number;

  @Field(() => String, { nullable: true })
  jobId: string;
}

@InputType()
export class CreateJobGroupJobsInput extends BaseJobGroupJobsInput {}

@InputType()
export class UpdateJobGroupJobsInput extends BaseJobGroupJobsInput {
  @Field()
  id!: string;
}

@InputType()
export class JobGroupJobsPaginationInput extends BasePaginationInput {}

@InputType()
export class JobGroupJobsConditionInput extends BaseConditionInput {}

@InputType()
export class JobGroupJobsQueryInput extends BaseQueryInput({
  conditionInput: JobGroupJobsConditionInput,
  paginationInput: JobGroupJobsPaginationInput,
})<JobGroupJobsConditionInput, JobGroupJobsPaginationInput> {}
