import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerIndustryInput {
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
  industryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@InputType()
export class CreateJobSeekerIndustryInput extends BaseJobSeekerIndustryInput {}

@InputType()
export class UpdateJobSeekerIndustryInput extends BaseJobSeekerIndustryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerIndustryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerIndustryConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerIndustryQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerIndustryConditionInput,
  paginationInput: JobSeekerIndustryPaginationInput,
})<JobSeekerIndustryConditionInput, JobSeekerIndustryPaginationInput> {}
