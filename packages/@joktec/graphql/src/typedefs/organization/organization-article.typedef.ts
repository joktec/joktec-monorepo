import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationArticle extends BaseTypedef {
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

@ObjectType()
export class OrganizationArticleDetail extends OrganizationArticle {}

@ObjectType()
export class OrganizationArticleListReponse extends BaseListResponse({
  viewDto: OrganizationArticle,
}) {}
