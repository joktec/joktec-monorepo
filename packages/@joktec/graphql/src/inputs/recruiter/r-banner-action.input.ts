import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRBannerActionInput {
  @Field(() => String, {
    nullable: true,
  })
  userId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  extraData!: string;

  @Field(() => Int, {
    nullable: true,
  })
  bannerId!: number;
}

@InputType()
export class CreateRBannerActionInput extends BaseRBannerActionInput {}

@InputType()
export class UpdateRBannerActionInput extends BaseRBannerActionInput {
  @Field()
  id!: string;
}

@InputType()
export class RBannerActionPaginationInput extends BasePaginationInput {}

@InputType()
export class RBannerActionConditionInput extends BaseConditionInput {}

@InputType()
export class RBannerActionQueryInput extends BaseQueryInput({
  conditionInput: RBannerActionConditionInput,
  paginationInput: RBannerActionPaginationInput,
})<RBannerActionConditionInput, RBannerActionPaginationInput> {}
