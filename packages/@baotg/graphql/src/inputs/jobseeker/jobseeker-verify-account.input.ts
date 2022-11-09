import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerVerifyAccountInput {
  @Field(() => String, {
    nullable: true,
  })
  note!: string;

  @Field(() => String, {
    nullable: true,
  })
  verifyMethod!: string;

  @Field(() => String, {
    nullable: true,
  })
  identityCardId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isVerified!: number;

  @Field(() => String, {
    nullable: true,
  })
  approvedById!: string;

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

  @Field(() => String, {
    nullable: true,
  })
  companyEmail!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;
}

@InputType()
export class CreateJobSeekerVerifyAccountInput extends BaseJobSeekerVerifyAccountInput {}

@InputType()
export class UpdateJobSeekerVerifyAccountInput extends BaseJobSeekerVerifyAccountInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerVerifyAccountPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerVerifyAccountConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerVerifyAccountQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerVerifyAccountConditionInput,
  paginationInput: JobSeekerVerifyAccountPaginationInput,
})<JobSeekerVerifyAccountConditionInput, JobSeekerVerifyAccountPaginationInput> {}
