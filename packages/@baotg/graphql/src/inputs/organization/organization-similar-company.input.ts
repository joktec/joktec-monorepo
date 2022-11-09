import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationSimilarCompanyInput {
  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;

  @Field(() => String, {
    nullable: true,
  })
  linkedOrganizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@InputType()
export class CreateOrganizationSimilarCompanyInput extends BaseOrganizationSimilarCompanyInput {}

@InputType()
export class UpdateOrganizationSimilarCompanyInput extends BaseOrganizationSimilarCompanyInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationSimilarCompanyPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationSimilarCompanyConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationSimilarCompanyQueryInput extends BaseQueryInput({
  conditionInput: OrganizationSimilarCompanyConditionInput,
  paginationInput: OrganizationSimilarCompanyPaginationInput,
})<OrganizationSimilarCompanyConditionInput, OrganizationSimilarCompanyPaginationInput> {}
