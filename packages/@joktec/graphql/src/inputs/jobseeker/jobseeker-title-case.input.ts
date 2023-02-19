import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerTitleCaseInput {
  @Field(() => String, {
    nullable: true,
  })
  title!: string;
}

@InputType()
export class CreateJobSeekerTitleCaseInput extends BaseJobSeekerTitleCaseInput {}

@InputType()
export class UpdateJobSeekerTitleCaseInput extends BaseJobSeekerTitleCaseInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerTitleCasePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerTitleCaseConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerTitleCaseQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerTitleCaseConditionInput,
  paginationInput: JobSeekerTitleCasePaginationInput,
})<JobSeekerTitleCaseConditionInput, JobSeekerTitleCasePaginationInput> {}
