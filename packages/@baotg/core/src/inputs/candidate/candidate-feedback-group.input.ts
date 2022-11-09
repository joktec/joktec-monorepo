import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidateFeedbackGroupInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;
}

export class CreateCandidateFeedbackGroupInput extends BaseCandidateFeedbackGroupInput implements IBaseCreateInput {}

export class UpdateCandidateFeedbackGroupInput extends BaseCandidateFeedbackGroupInput implements IBaseUpdateInput {
  id!: string;
}

export class CandidateFeedbackGroupPaginationInput extends BasePaginationInput {}

export class CandidateFeedbackGroupConditionInput extends BaseConditionInput {}

export class CandidateFeedbackGroupQueryInput extends BaseQueryInput<
  CandidateFeedbackGroupConditionInput,
  CandidateFeedbackGroupPaginationInput
> {}
