import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerFollowedOrganizationInput {
  @Field(() => Int, {
    nullable: true,
  })
  following!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  emailSubscribed!: number;

  @Field(() => Int, {
    nullable: true,
  })
  numberOfFollowTime!: number;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;
}

@InputType()
export class CreateJobSeekerFollowedOrganizationInput extends BaseJobSeekerFollowedOrganizationInput {}

@InputType()
export class UpdateJobSeekerFollowedOrganizationInput extends BaseJobSeekerFollowedOrganizationInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerFollowedOrganizationPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerFollowedOrganizationConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerFollowedOrganizationQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerFollowedOrganizationConditionInput,
  paginationInput: JobSeekerFollowedOrganizationPaginationInput,
})<JobSeekerFollowedOrganizationConditionInput, JobSeekerFollowedOrganizationPaginationInput> {}
