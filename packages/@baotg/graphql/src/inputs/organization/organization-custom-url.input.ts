import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationCustomUrlInput {
  @Field(() => String, {
    nullable: true,
  })
  fromUrl!: string;

  @Field(() => String, {
    nullable: true,
  })
  toUrl!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@InputType()
export class CreateOrganizationCustomUrlInput extends BaseOrganizationCustomUrlInput {}

@InputType()
export class UpdateOrganizationCustomUrlInput extends BaseOrganizationCustomUrlInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationCustomUrlPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationCustomUrlConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationCustomUrlQueryInput extends BaseQueryInput({
  conditionInput: OrganizationCustomUrlConditionInput,
  paginationInput: OrganizationCustomUrlPaginationInput,
})<OrganizationCustomUrlConditionInput, OrganizationCustomUrlPaginationInput> {}
