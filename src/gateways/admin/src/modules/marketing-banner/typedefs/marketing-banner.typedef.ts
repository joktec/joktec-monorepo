import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class MarketingBannerTypedef extends BaseTypedef {
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
  validFrom!: Date;

  @Field(() => String, {
    nullable: true,
  })
  validUntil!: Date;

  @Field(() => Number, {
    nullable: true,
  })
  active!: number;

  @Field(() => Number, {
    nullable: true,
  })
  isTest!: number;
}

@ObjectType()
export class MarketingBannerDetailTypedef extends MarketingBannerTypedef {}

@ObjectType()
export class MarketingBannerListResponseTypedef extends BaseListResponse({
  viewDto: MarketingBannerTypedef,
}) {}
