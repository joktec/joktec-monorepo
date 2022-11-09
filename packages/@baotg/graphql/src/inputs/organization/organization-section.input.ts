import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationSectionInput {
  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  titleVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionVi!: string;

  @Field(() => Int, {
    nullable: true,
  })
  order!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@InputType()
export class CreateOrganizationSectionInput extends BaseOrganizationSectionInput {}

@InputType()
export class UpdateOrganizationSectionInput extends BaseOrganizationSectionInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationSectionPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationSectionConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationSectionQueryInput extends BaseQueryInput({
  conditionInput: OrganizationSectionConditionInput,
  paginationInput: OrganizationSectionPaginationInput,
})<OrganizationSectionConditionInput, OrganizationSectionPaginationInput> {}
