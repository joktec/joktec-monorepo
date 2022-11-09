import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerJobSavedInput {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;
}

@InputType()
export class CreateJobSeekerJobSavedInput extends BaseJobSeekerJobSavedInput {}

@InputType()
export class UpdateJobSeekerJobSavedInput extends BaseJobSeekerJobSavedInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerJobSavedPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerJobSavedConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerJobSavedQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerJobSavedConditionInput,
  paginationInput: JobSeekerJobSavedPaginationInput,
})<JobSeekerJobSavedConditionInput, JobSeekerJobSavedPaginationInput> {}
