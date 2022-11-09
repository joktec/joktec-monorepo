import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerInterestInput {
  @Field(() => String, {
    nullable: true,
  })
  interest!: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@InputType()
export class CreateJobSeekerInterestInput extends BaseJobSeekerInterestInput {}

@InputType()
export class UpdateJobSeekerInterestInput extends BaseJobSeekerInterestInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerInterestPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerInterestConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerInterestQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerInterestConditionInput,
  paginationInput: JobSeekerInterestPaginationInput,
})<JobSeekerInterestConditionInput, JobSeekerInterestPaginationInput> {}
