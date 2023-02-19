import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationReview extends BaseTypedef {
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

  @Field(() => String, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => String, {
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

@ObjectType()
export class OrganizationReviewDetail0 extends OrganizationReview {}

@ObjectType()
export class OrganizationReviewListReponse extends BaseListResponse({
  viewDto: OrganizationReview,
}) {}
