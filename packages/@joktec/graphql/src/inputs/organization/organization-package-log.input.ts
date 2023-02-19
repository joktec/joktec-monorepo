import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationPackageLogInput {
  @Field(() => Int, {
    nullable: true,
  })
  credits!: number;

  @Field(() => Date, {
    nullable: true,
  })
  created!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updated!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  eventType!: number;

  @Field(() => Date, {
    nullable: true,
  })
  packageBoughtDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  awardType!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdById!: string;

  @Field(() => Int, {
    nullable: true,
  })
  packageId!: number;

  @Field(() => String, {
    nullable: true,
  })
  updatedById!: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isThumbedUp!: number;

  @Field(() => String, {
    nullable: true,
  })
  comment!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  staffUser!: string;

  @Field(() => Int, {
    nullable: true,
  })
  remainingCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isTrialCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalCredits!: number;
}

@InputType()
export class CreateOrganizationPackageLogInput extends BaseOrganizationPackageLogInput {}

@InputType()
export class UpdateOrganizationPackageLogInput extends BaseOrganizationPackageLogInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationPackageLogPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationPackageLogConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationPackageLogQueryInput extends BaseQueryInput({
  conditionInput: OrganizationPackageLogConditionInput,
  paginationInput: OrganizationPackageLogPaginationInput,
})<OrganizationPackageLogConditionInput, OrganizationPackageLogPaginationInput> {}
