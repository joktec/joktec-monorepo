import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationExpiredPackageInput {
  @Field(() => Date, {
    nullable: true,
  })
  created!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updated!: Date;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  packageId!: number;
}

@InputType()
export class CreateOrganizationExpiredPackageInput extends BaseOrganizationExpiredPackageInput {}

@InputType()
export class UpdateOrganizationExpiredPackageInput extends BaseOrganizationExpiredPackageInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationExpiredPackagePaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationExpiredPackageConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationExpiredPackageQueryInput extends BaseQueryInput({
  conditionInput: OrganizationExpiredPackageConditionInput,
  paginationInput: OrganizationExpiredPackagePaginationInput,
})<OrganizationExpiredPackageConditionInput, OrganizationExpiredPackagePaginationInput> {}
