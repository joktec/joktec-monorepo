import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRBannerInput {
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
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  position!: string;

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

  @Field(() => Int, {
    nullable: true,
  })
  active!: number;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;
}

@InputType()
export class CreateRBannerInput extends BaseRBannerInput {}

@InputType()
export class UpdateRBannerInput extends BaseRBannerInput {
  @Field()
  id!: string;
}

@InputType()
export class RBannerPaginationInput extends BasePaginationInput {}

@InputType()
export class RBannerConditionInput extends BaseConditionInput {}

@InputType()
export class RBannerQueryInput extends BaseQueryInput({
  conditionInput: RBannerConditionInput,
  paginationInput: RBannerPaginationInput,
})<RBannerConditionInput, RBannerPaginationInput> {}
