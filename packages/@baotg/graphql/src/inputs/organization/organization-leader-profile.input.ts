import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationLeaderProfileInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  avatar!: string;

  @Field(() => String, {
    nullable: true,
  })
  linkedinLink!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@InputType()
export class CreateOrganizationLeaderProfileInput extends BaseOrganizationLeaderProfileInput {}

@InputType()
export class UpdateOrganizationLeaderProfileInput extends BaseOrganizationLeaderProfileInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationLeaderProfilePaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationLeaderProfileConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationLeaderProfileQueryInput extends BaseQueryInput({
  conditionInput: OrganizationLeaderProfileConditionInput,
  paginationInput: OrganizationLeaderProfilePaginationInput,
})<OrganizationLeaderProfileConditionInput, OrganizationLeaderProfilePaginationInput> {}
