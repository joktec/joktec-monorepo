import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@baotg/graphql';

@InputType()
export class BaseBannerInput {
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

  @Field(() => Number, {
    nullable: false,
  })
  @IsNotEmpty()
  active!: number;

  @Field(() => String, {
    nullable: true,
  })
  fileMobil!: number;

  @Field(() => Date, {
    nullable: false,
  })
  @IsNotEmpty()
  validFrom!: Date;

  @Field(() => Date, {
    nullable: false,
  })
  @IsNotEmpty()
  validUntil!: Date;
}

@InputType()
export class CreateBannerInput extends BaseBannerInput {}

@InputType()
export class UpdateBannerInput extends BaseBannerInput {
  // @Field()
  // id!: string;
}

@InputType()
export class BannerPaginationInput extends BasePaginationInput {}

@InputType()
export class BannerConditionInput extends BaseConditionInput {}

@InputType()
export class BannerQueryInput extends BaseQueryInput({
  conditionInput: BannerConditionInput,
  paginationInput: BannerPaginationInput,
})<BannerConditionInput, BannerPaginationInput> {}
