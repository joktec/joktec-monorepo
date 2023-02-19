import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterPaymentInput {
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

@InputType()
export class CreateRecruiterPaymentInput extends BaseRecruiterPaymentInput {}

@InputType()
export class UpdateRecruiterPaymentInput extends BaseRecruiterPaymentInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterPaymentPaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterPaymentConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterPaymentQueryInput extends BaseQueryInput({
  conditionInput: RecruiterPaymentConditionInput,
  paginationInput: RecruiterPaymentPaginationInput,
})<RecruiterPaymentConditionInput, RecruiterPaymentPaginationInput> {}
