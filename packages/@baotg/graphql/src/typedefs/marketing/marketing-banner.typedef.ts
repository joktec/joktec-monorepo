import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class MarketingBanner extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  file!: string;

  @Field(() => String, {
    nullable: true,
  })
  lang!: string;

  @Field(() => String, {
    nullable: true,
  })
  redirectLink!: string;

  @Field(() => String, {
    nullable: true,
  })
  bannerType!: string;

  @Field(() => String, {
    nullable: true,
  })
  bannerPosition!: string;

  @Field(() => String, {
    nullable: true,
  })
  marketingLocation!: string;

  @Field(() => String, {
    nullable: true,
  })
  page!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  validFrom!: Date;

  @Field(() => String, {
    nullable: true,
  })
  validUntil!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  active!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isTest!: number;
}

@ObjectType()
export class MarketingBannerDetail extends MarketingBanner {}

@ObjectType()
export class MarketingBannerListReponse extends BaseListResponse({
  viewDto: MarketingBanner,
}) {}
