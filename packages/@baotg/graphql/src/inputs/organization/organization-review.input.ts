import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationReviewInput {
  @Field(() => String, {
    nullable: true,
  })
  reviewId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isAnonymous!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isCurrentEmployee!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  department!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  overallRating!: number;

  @Field(() => Int, {
    nullable: true,
  })
  willRefer!: number;

  @Field(() => String, {
    nullable: true,
  })
  reviewTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  advantages!: string;

  @Field(() => String, {
    nullable: true,
  })
  disadvantages!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

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
  expYears!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isClickable!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isIncognitoMode!: number;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  year!: string;

  @Field(() => String, {
    nullable: true,
  })
  approval!: string;

  @Field(() => Int, {
    nullable: true,
  })
  sentNotification!: number;

  @Field(() => String, {
    nullable: true,
  })
  unapprovedReason!: string;
}

@InputType()
export class CreateOrganizationReviewInput extends BaseOrganizationReviewInput {}

@InputType()
export class UpdateOrganizationReviewInput extends BaseOrganizationReviewInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationReviewPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationReviewConditionInput extends BaseConditionInput {}

@InputType()
export class OrganizationReviewQueryInput extends BaseQueryInput({
  conditionInput: OrganizationReviewConditionInput,
  paginationInput: OrganizationReviewPaginationInput,
})<OrganizationReviewConditionInput, OrganizationReviewPaginationInput> {}
