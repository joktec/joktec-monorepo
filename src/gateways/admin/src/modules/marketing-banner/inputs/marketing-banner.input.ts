import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseMarketingBannerInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  file!: string;

  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
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

@InputType()
export class CreateMarketingBannerInput extends BaseMarketingBannerInput {}

@InputType()
export class UpdateMarketingBannerInput extends BaseMarketingBannerInput {
  // @Field()
  // id!: string;
}

@InputType()
export class MarketingBannerPaginationInput extends BasePaginationInput {}

@InputType()
export class MarketingBannerConditionInput extends BaseConditionInput {}

@InputType()
export class MarketingBannerQueryInput extends BaseQueryInput({
  conditionInput: MarketingBannerConditionInput,
  paginationInput: MarketingBannerPaginationInput,
})<MarketingBannerConditionInput, MarketingBannerPaginationInput> {}
