import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationRecruiterInput {
  @Field(() => Int, {
    nullable: true,
  })
  isPrimary!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  recruiterId!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => Date, {
    nullable: true,
  })
  approvedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  reason!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  usersId!: string;
}

@InputType()
export class CreateOrganizationRecruiterInput extends BaseOrganizationRecruiterInput {}

@InputType()
export class UpdateOrganizationRecruiterInput extends BaseOrganizationRecruiterInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationRecruiterPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationRecruiterConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationRecruiterQueryInput extends BaseQueryInput({
  conditionInput: OrganizationRecruiterConditionInput,
  paginationInput: OrganizationRecruiterPaginationInput,
})<OrganizationRecruiterConditionInput, OrganizationRecruiterPaginationInput> {}
