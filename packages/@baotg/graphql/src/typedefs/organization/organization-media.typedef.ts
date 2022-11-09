import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationMedia extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => String, {
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

@ObjectType()
export class OrganizationMediaDetail extends OrganizationMedia {}

@ObjectType()
export class OrganizationMediaListReponse extends BaseListResponse({
  viewDto: OrganizationMedia,
}) {}
