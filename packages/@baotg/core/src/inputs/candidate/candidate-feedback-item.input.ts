import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidateFeedbackItemInput implements IBaseInput {
  @IsNotEmpty()
  level!: number;

  name!: string;

  inputType!: string;

  groupId!: number;

  parentId!: number;
}

export class CreateCandidateFeedbackItemInput extends BaseCandidateFeedbackItemInput implements IBaseCreateInput {}

export class UpdateCandidateFeedbackItemInput extends BaseCandidateFeedbackItemInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateFeedbackItemPaginationInput extends BasePaginationInput {}

export class CandidateFeedbackItemConditionInput extends BaseConditionInput {}

export class CandidateFeedbackItemQueryInput extends BaseQueryInput<
  CandidateFeedbackItemConditionInput,
  CandidateFeedbackItemPaginationInput
> {}
