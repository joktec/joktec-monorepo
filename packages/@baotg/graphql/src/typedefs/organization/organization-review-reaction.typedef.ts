import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationReviewReaction extends BaseTypedef {
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

  @Field(() => String, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  reviewId!: string;
}

@ObjectType()
export class OrganizationReviewReactionDetail extends OrganizationReviewReaction {}

@ObjectType()
export class OrganizationReviewReactionListReponse extends BaseListResponse({
  viewDto: OrganizationReviewReaction,
}) {}
