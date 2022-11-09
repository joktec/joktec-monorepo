import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@baotg/graphql';

@ObjectType()
export class BannerTypedef extends BaseTypedef {
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
  active!: number;

  @Field(() => String, {
    nullable: true,
  })
  fileMobil!: string;

  @Field(() => String, {
    nullable: true,
  })
  validFrom!: Date;

  @Field(() => String, {
    nullable: true,
  })
  validUntil!: Date;
}

@ObjectType()
export class BannerDetailTypedef extends BannerTypedef {}

@ObjectType()
export class BannerListResponseTypedef extends BaseListResponse({
  viewDto: BannerTypedef,
}) {}
