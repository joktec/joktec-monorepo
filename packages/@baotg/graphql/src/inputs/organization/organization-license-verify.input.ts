import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationLicenseVerifyInput {
  @Field(() => Int, {
    nullable: true,
  })
  step!: number;

  @Field(() => Date, {
    nullable: true,
  })
  reminderDate!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  sent!: number;

  @Field(() => Int, {
    nullable: true,
  })
  toInternal!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  reminderType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;
}

@InputType()
export class CreateOrganizationLicenseVerifyInput extends BaseOrganizationLicenseVerifyInput {}

@InputType()
export class UpdateOrganizationLicenseVerifyInput extends BaseOrganizationLicenseVerifyInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationLicenseVerifyPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationLicenseVerifyConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationLicenseVerifyQueryInput extends BaseQueryInput({
  conditionInput: OrganizationLicenseVerifyConditionInput,
  paginationInput: OrganizationLicenseVerifyPaginationInput,
})<OrganizationLicenseVerifyConditionInput, OrganizationLicenseVerifyPaginationInput> {}
