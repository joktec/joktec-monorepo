import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationPackageInput {
  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  logo!: string;

  @Field(() => Int, {
    nullable: true,
  })
  maxCandidate!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxJob!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxUser!: number;

  @Field(() => Int, {
    nullable: true,
  })
  minimumPay!: number;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Int, {
    nullable: true,
  })
  price!: number;

  @Field(() => Int, {
    nullable: true,
  })
  priceUsd!: number;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => Int, {
    nullable: true,
  })
  credits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  enabled!: number;

  @Field(() => Int, {
    nullable: true,
  })
  bonusCreditPerct!: number;

  @Field(() => Int, {
    nullable: true,
  })
  bonusCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  expiryMonth!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxAdmin!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxHrMember!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxHiringManager!: number;

  @Field(() => Int, {
    nullable: true,
  })
  expiryDay!: number;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => Int, {
    nullable: true,
  })
  maxJobInterview!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxTiAssistedJob!: number;
}

@InputType()
export class CreateOrganizationPackageInput extends BaseOrganizationPackageInput {}

@InputType()
export class UpdateOrganizationPackageInput extends BaseOrganizationPackageInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationPackagePaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationPackageConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationPackageQueryInput extends BaseQueryInput({
  conditionInput: OrganizationPackageConditionInput,
  paginationInput: OrganizationPackagePaginationInput,
})<OrganizationPackageConditionInput, OrganizationPackagePaginationInput> {}
