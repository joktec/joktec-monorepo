import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationPlatformInput {
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
  platformId!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@InputType()
export class CreateOrganizationPlatformInput extends BaseOrganizationPlatformInput {}

@InputType()
export class UpdateOrganizationPlatformInput extends BaseOrganizationPlatformInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationPlatformPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationPlatformConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationPlatformQueryInput extends BaseQueryInput({
  conditionInput: OrganizationPlatformConditionInput,
  paginationInput: OrganizationPlatformPaginationInput,
})<OrganizationPlatformConditionInput, OrganizationPlatformPaginationInput> {}
