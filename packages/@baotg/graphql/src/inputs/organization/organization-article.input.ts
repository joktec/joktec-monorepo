import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationArticleInput {
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

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  source!: string;

  @Field(() => String, {
    nullable: true,
  })
  sourceVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  titleVi!: string;

  @Field(() => Int, {
    nullable: true,
  })
  sectionId!: number;
}

@InputType()
export class CreateOrganizationArticleInput extends BaseOrganizationArticleInput {}

@InputType()
export class UpdateOrganizationArticleInput extends BaseOrganizationArticleInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationArticlePaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationArticleConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationArticleQueryInput extends BaseQueryInput({
  conditionInput: OrganizationArticleConditionInput,
  paginationInput: OrganizationArticlePaginationInput,
})<OrganizationArticleConditionInput, OrganizationArticlePaginationInput> {}
