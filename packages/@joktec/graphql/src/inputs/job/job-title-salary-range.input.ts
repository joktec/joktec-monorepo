import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobTitleSalaryRangeInput {
  @Field(() => String, { nullable: true })
  jobTitle: string;

  @Field(() => Number, { nullable: true })
  salaryMin: number;

  @Field(() => Number, { nullable: true })
  salaryMax: number;
}

@InputType()
export class CreateJobTitleSalaryRangeInput extends BaseJobTitleSalaryRangeInput {}

@InputType()
export class UpdateJobTitleSalaryRangeInput extends BaseJobTitleSalaryRangeInput {
  @Field()
  id!: string;
}

@InputType()
export class JobTitleSalaryRangePaginationInput extends BasePaginationInput {}

@InputType()
export class JobTitleSalaryRangeConditionInput extends BaseConditionInput {}

@InputType()
export class JobTitleSalaryRangeQueryInput extends BaseQueryInput({
  conditionInput: JobTitleSalaryRangeConditionInput,
  paginationInput: JobTitleSalaryRangePaginationInput,
})<JobTitleSalaryRangeConditionInput, JobTitleSalaryRangePaginationInput> {}
