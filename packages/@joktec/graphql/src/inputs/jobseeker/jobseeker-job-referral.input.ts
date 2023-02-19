import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerJobReferralInput {
  @Field(() => String, {
    nullable: true,
  })
  referralId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;
}

@InputType()
export class CreateJobSeekerJobReferralInput extends BaseJobSeekerJobReferralInput {}

@InputType()
export class UpdateJobSeekerJobReferralInput extends BaseJobSeekerJobReferralInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerJobReferralPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerJobReferralConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerJobReferralQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerJobReferralConditionInput,
  paginationInput: JobSeekerJobReferralPaginationInput,
})<JobSeekerJobReferralConditionInput, JobSeekerJobReferralPaginationInput> {}
