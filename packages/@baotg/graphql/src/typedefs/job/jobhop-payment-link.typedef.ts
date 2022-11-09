import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopPaymentLink extends BaseTypedef {
  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => String, { nullable: true })
  validTo: Date;

  @Field(() => String, { nullable: true })
  update: Date;

  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => Number, { nullable: true })
  used: number;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => Number, { nullable: true })
  packageId: number;

  @Field(() => Number, { nullable: true })
  selected: number;

  @Field(() => Number, { nullable: true })
  vat: number;
}

@ObjectType()
export class JobhopPaymentLinkDetail extends JobhopPaymentLink {}

@ObjectType()
export class JobhopPaymentLinkListResponse extends BaseListResponse({
  viewDto: JobhopPaymentLink,
}) {}
