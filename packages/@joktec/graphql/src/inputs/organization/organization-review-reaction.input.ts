import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationReviewReactionInput {
  @Field(() => String, {
    nullable: true,
  })
  reactionReviewId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  reactionType!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  reviewId!: string;
}

@InputType()
export class CreateOrganizationReviewReactionInput extends BaseOrganizationReviewReactionInput {}

@InputType()
export class UpdateOrganizationReviewReactionInput extends BaseOrganizationReviewReactionInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationReviewReactionPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationReviewReactionConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationReviewReactionQueryInput extends BaseQueryInput({
  conditionInput: OrganizationReviewReactionConditionInput,
  paginationInput: OrganizationReviewReactionPaginationInput,
})<OrganizationReviewReactionConditionInput, OrganizationReviewReactionPaginationInput> {}
