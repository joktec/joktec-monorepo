import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationInsiderInput {
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
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnail!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnailLarge!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnailMedium!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnailSmall!: string;

  @Field(() => Int, {
    nullable: true,
  })
  jobTitleId!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  titleVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  linkedinLink!: string;

  @Field(() => String, {
    nullable: true,
  })
  quotes!: string;

  @Field(() => String, {
    nullable: true,
  })
  quotesVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  websiteLink!: string;
}

@InputType()
export class CreateOrganizationInsiderInput extends BaseOrganizationInsiderInput {}

@InputType()
export class UpdateOrganizationInsiderInput extends BaseOrganizationInsiderInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationInsiderPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationInsiderConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationInsiderQueryInput extends BaseQueryInput({
  conditionInput: OrganizationInsiderConditionInput,
  paginationInput: OrganizationInsiderPaginationInput,
})<OrganizationInsiderConditionInput, OrganizationInsiderPaginationInput> {}
