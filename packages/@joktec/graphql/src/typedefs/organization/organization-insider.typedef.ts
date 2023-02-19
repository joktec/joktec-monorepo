import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationInsider extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created!: Date;

  @Field(() => String, {
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

@ObjectType()
export class OrganizationInsiderDetail extends OrganizationInsider {}

@ObjectType()
export class OrganizationInsiderListReponse extends BaseListResponse({
  viewDto: OrganizationInsider,
}) {}
