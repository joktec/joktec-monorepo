import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationPackageHistoryInput {
  @Field(() => String, {
    nullable: true,
  })
  organizationName!: string;

  @Field(() => String, {
    nullable: true,
  })
  action!: string;

  @Field(() => String, {
    nullable: true,
  })
  userEmail!: string;

  @Field(() => String, {
    nullable: true,
  })
  prevPackage!: string;

  @Field(() => String, {
    nullable: true,
  })
  newPackage!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  bonusCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxAdmin!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxJobInterview!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxUser!: number;

  @Field(() => Int, {
    nullable: true,
  })
  jobSlot!: number;

  @Field(() => Int, {
    nullable: true,
  })
  oldPackageId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  packageId!: number;
}

@InputType()
export class CreateOrganizationPackageHistoryInput extends BaseOrganizationPackageHistoryInput {}

@InputType()
export class UpdateOrganizationPackageHistoryInput extends BaseOrganizationPackageHistoryInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationPackageHistoryPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationPackageHistoryConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationPackageHistoryQueryInput extends BaseQueryInput({
  conditionInput: OrganizationPackageHistoryConditionInput,
  paginationInput: OrganizationPackageHistoryPaginationInput,
})<OrganizationPackageHistoryConditionInput, OrganizationPackageHistoryPaginationInput> {}
