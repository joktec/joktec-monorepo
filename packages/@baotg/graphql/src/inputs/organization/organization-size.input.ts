import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationSizeInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEn!: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;

  @Field(() => Int, {
    nullable: true,
  })
  enabled!: number;
}

@InputType()
export class CreateOrganizationSizeInput extends BaseOrganizationSizeInput {}

@InputType()
export class UpdateOrganizationSizeInput extends BaseOrganizationSizeInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationSizePaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationSizeConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationSizeQueryInput extends BaseQueryInput({
  conditionInput: OrganizationSizeConditionInput,
  paginationInput: OrganizationSizePaginationInput,
})<OrganizationSizeConditionInput, OrganizationSizePaginationInput> {}
