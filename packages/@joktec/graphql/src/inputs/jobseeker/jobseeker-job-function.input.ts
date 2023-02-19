import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerJobFunctionInput {
  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobFunction!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@InputType()
export class CreateJobSeekerJobFunctionInput extends BaseJobSeekerJobFunctionInput {}

@InputType()
export class UpdateJobSeekerJobFunctionInput extends BaseJobSeekerJobFunctionInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerJobFunctionPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerJobFunctionConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerJobFunctionQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerJobFunctionConditionInput,
  paginationInput: JobSeekerJobFunctionPaginationInput,
})<JobSeekerJobFunctionConditionInput, JobSeekerJobFunctionPaginationInput> {}
