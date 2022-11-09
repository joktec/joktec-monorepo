import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidateFeedbackGroupContentInput implements IBaseInput {
  @IsNotEmpty()
  lang!: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  items!: object;

  @IsNotEmpty()
  candidatefeedbackgroupId!: number;
}

export class CreateCandidateFeedbackGroupContentInput
  extends BaseCandidateFeedbackGroupContentInput
  implements IBaseCreateInput {}

export class UpdateCandidateFeedbackGroupContentInput
  extends BaseCandidateFeedbackGroupContentInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateFeedbackGroupContentPaginationInput extends BasePaginationInput {}

export class CandidateFeedbackGroupContentConditionInput extends BaseConditionInput {}

export class CandidateFeedbackGroupContentQueryInput extends BaseQueryInput<
  CandidateFeedbackGroupContentConditionInput,
  CandidateFeedbackGroupContentPaginationInput
> {}
