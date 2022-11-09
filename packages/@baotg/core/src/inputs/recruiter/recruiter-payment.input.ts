import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterPaymentInput implements IBaseInput {
  recruiterPaymentId!: string;

  amount!: number;

  checkOutAt!: Date;

  currency!: string;

  orderCode!: string;

  organizationId!: string;

  packageId!: number;

  paidAt!: Date;

  paymentId!: string;

  paymentType!: string;

  recruiter!: string;

  secureCode!: string;

  status!: string;

  tokenNl!: string;

  numberOfMonths!: number;

  discount!: number;

  jobSlot!: number;
}

export class CreateRecruiterPaymentInput extends BaseRecruiterPaymentInput implements IBaseCreateInput {}

export class UpdateRecruiterPaymentInput extends BaseRecruiterPaymentInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterPaymentPaginationInput extends BasePaginationInput {}

export class RecruiterPaymentConditionInput extends BaseConditionInput {}

export class RecruiterPaymentQueryInput extends BaseQueryInput<
  RecruiterPaymentConditionInput,
  RecruiterPaymentPaginationInput
> {}
