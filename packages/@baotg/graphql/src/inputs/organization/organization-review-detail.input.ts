import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationReviewDetailInput {
  @Field(() => Int, {
    nullable: true,
  })
  rating!: number;

  @Field(() => Int, {
    nullable: true,
  })
  questionId!: number;

  @Field(() => String, {
    nullable: true,
  })
  reviewId!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedDate!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  categoryId!: number;
}

@InputType()
export class CreateOrganizationReviewDetailInput extends BaseOrganizationReviewDetailInput {}

@InputType()
export class UpdateOrganizationReviewDetailInput extends BaseOrganizationReviewDetailInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationReviewDetailPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationReviewDetailConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationReviewDetailQueryInput extends BaseQueryInput({
  conditionInput: OrganizationReviewDetailConditionInput,
  paginationInput: OrganizationReviewDetailPaginationInput,
})<OrganizationReviewDetailConditionInput, OrganizationReviewDetailPaginationInput> {}
