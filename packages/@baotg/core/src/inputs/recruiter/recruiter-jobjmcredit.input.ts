import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterJobjmcreditInput implements IBaseInput {
  startTime!: Date;

  endTime!: Date;

  creditBurned!: number;

  updated!: Date;

  jobId!: string;

  planId!: number;
}

export class CreateRecruiterJobjmcreditInput extends BaseRecruiterJobjmcreditInput implements IBaseCreateInput {}

export class UpdateRecruiterJobjmcreditInput extends BaseRecruiterJobjmcreditInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterJobjmcreditPaginationInput extends BasePaginationInput {}

export class RecruiterJobjmcreditConditionInput extends BaseConditionInput {}

export class RecruiterJobjmcreditQueryInput extends BaseQueryInput<
  RecruiterJobjmcreditConditionInput,
  RecruiterJobjmcreditPaginationInput
> {}
