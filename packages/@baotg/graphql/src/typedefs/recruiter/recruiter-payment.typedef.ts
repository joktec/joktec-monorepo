import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class RecruiterPayment extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  recruiterPaymentId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  amount!: number;

  @Field(() => String, {
    nullable: true,
  })
  checkOutAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  currency!: string;

  @Field(() => String, {
    nullable: true,
  })
  orderCode!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  packageId!: number;

  @Field(() => String, {
    nullable: true,
  })
  paidAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  paymentId!: string;

  @Field(() => String, {
    nullable: true,
  })
  paymentType!: string;

  @Field(() => String, {
    nullable: true,
  })
  recruiter!: string;

  @Field(() => String, {
    nullable: true,
  })
  secureCode!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  tokenNl!: string;

  @Field(() => Int, {
    nullable: true,
  })
  numberOfMonths!: number;

  @Field(() => Int, {
    nullable: true,
  })
  discount!: number;

  @Field(() => Int, {
    nullable: true,
  })
  jobSlot!: number;
}

@ObjectType()
export class RecruiterPaymentDetail extends RecruiterPayment {}

@ObjectType()
export class RecruiterPaymentListReponse extends BaseListResponse({
  viewDto: RecruiterPayment,
}) {}
