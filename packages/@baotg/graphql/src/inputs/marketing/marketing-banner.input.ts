import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseMarketingBannerInput {
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

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  validFrom!: Date;

  @Field(() => Date, {
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

@InputType()
export class CreateMarketingBannerInput extends BaseMarketingBannerInput {}

@InputType()
export class UpdateMarketingBannerInput extends BaseMarketingBannerInput {
  @Field()
  id!: string;
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
