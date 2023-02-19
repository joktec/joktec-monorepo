import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationFirstJobInput {
  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;
}

@InputType()
export class CreateOrganizationFirstJobInput extends BaseOrganizationFirstJobInput {}

@InputType()
export class UpdateOrganizationFirstJobInput extends BaseOrganizationFirstJobInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationFirstJobPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationFirstJobConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationFirstJobQueryInput extends BaseQueryInput({
  conditionInput: OrganizationFirstJobConditionInput,
  paginationInput: OrganizationFirstJobPaginationInput,
})<OrganizationFirstJobConditionInput, OrganizationFirstJobPaginationInput> {}
