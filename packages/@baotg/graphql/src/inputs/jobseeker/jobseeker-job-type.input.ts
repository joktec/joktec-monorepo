import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerJobTypeInput {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobTypeId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@InputType()
export class CreateJobSeekerJobTypeInput extends BaseJobSeekerJobTypeInput {}

@InputType()
export class UpdateJobSeekerJobTypeInput extends BaseJobSeekerJobTypeInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerJobTypePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerJobTypeConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerJobTypeQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerJobTypeConditionInput,
  paginationInput: JobSeekerJobTypePaginationInput,
})<JobSeekerJobTypeConditionInput, JobSeekerJobTypePaginationInput> {}
