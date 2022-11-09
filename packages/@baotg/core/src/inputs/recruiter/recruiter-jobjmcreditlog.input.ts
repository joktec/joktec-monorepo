import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterJobjmcreditlogInput implements IBaseInput {
  creditBurned!: number;

  jobId!: string;
}

export class CreateRecruiterJobjmcreditlogInput extends BaseRecruiterJobjmcreditlogInput implements IBaseCreateInput {}

export class UpdateRecruiterJobjmcreditlogInput extends BaseRecruiterJobjmcreditlogInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterJobjmcreditlogPaginationInput extends BasePaginationInput {}

export class RecruiterJobjmcreditlogConditionInput extends BaseConditionInput {}

export class RecruiterJobjmcreditlogQueryInput extends BaseQueryInput<
  RecruiterJobjmcreditlogConditionInput,
  RecruiterJobjmcreditlogPaginationInput
> {}
