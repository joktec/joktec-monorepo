import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class RBannerAction extends BaseTypedef {
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

@ObjectType()
export class RBannerActionDetail extends RBannerAction {}

@ObjectType()
export class RBannerActionListReponse extends BaseListResponse({
  viewDto: RBannerAction,
}) {}
