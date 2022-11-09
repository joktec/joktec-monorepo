import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationReviewDetail extends BaseTypedef {
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
  categoryId!: number;
}

@ObjectType()
export class OrganizationReviewDetailDetail extends OrganizationReviewDetail {}

@ObjectType()
export class OrganizationReviewDetailListReponse extends BaseListResponse({
  viewDto: OrganizationReviewDetail,
}) {}
