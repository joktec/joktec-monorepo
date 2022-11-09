import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerLevelExpectedInput {
  @Field(() => String, {
    nullable: true,
  })
  levelId!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@InputType()
export class CreateJobSeekerLevelExpectedInput extends BaseJobSeekerLevelExpectedInput {}

@InputType()
export class UpdateJobSeekerLevelExpectedInput extends BaseJobSeekerLevelExpectedInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerLevelExpectedPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerLevelExpectedConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerLevelExpectedQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerLevelExpectedConditionInput,
  paginationInput: JobSeekerLevelExpectedPaginationInput,
})<JobSeekerLevelExpectedConditionInput, JobSeekerLevelExpectedPaginationInput> {}
