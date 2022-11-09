import { IsNotEmpty } from 'class-validator';

import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidateFunctionInput implements IBaseInput {
  @IsNotEmpty()
  candidateId!: string;

  @IsNotEmpty()
  functionId!: number;
}

export class CreateCandidateFunctionInput extends BaseCandidateFunctionInput implements IBaseCreateInput {}

export class UpdateCandidateFunctionInput extends BaseCandidateFunctionInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateFunctionPaginationInput extends BasePaginationInput {}

export class CandidateFunctionConditionInput extends BaseConditionInput {}

export class CandidateFunctionQueryInput extends BaseQueryInput<
  CandidateFunctionConditionInput,
  CandidateFunctionPaginationInput
> {}
