import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationMediaInput {
  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  type!: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  url!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnailVideo!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnailVideoSmall!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnailCover!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnailCoverSmall!: string;

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
  thumbnailMediumSmall!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnailSmall!: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnailExtraSmall!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameVi!: string;
}

@InputType()
export class CreateOrganizationMediaInput extends BaseOrganizationMediaInput {}

@InputType()
export class UpdateOrganizationMediaInput extends BaseOrganizationMediaInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationMediaPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationMediaConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationMediaQueryInput extends BaseQueryInput({
  conditionInput: OrganizationMediaConditionInput,
  paginationInput: OrganizationMediaPaginationInput,
})<OrganizationMediaConditionInput, OrganizationMediaPaginationInput> {}
