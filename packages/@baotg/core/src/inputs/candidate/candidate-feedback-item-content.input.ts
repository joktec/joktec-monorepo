import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidateFeedbackItemContentInput implements IBaseInput {
  @IsNotEmpty()
  lang!: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  items!: object;

  @IsNotEmpty()
  candidatefeedbackitemId!: number;
}

export class CreateCandidateFeedbackItemContentInput
  extends BaseCandidateFeedbackItemContentInput
  implements IBaseCreateInput {}

export class UpdateCandidateFeedbackItemContentInput
  extends BaseCandidateFeedbackItemContentInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateFeedbackItemContentPaginationInput extends BasePaginationInput {}

export class CandidateFeedbackItemContentConditionInput extends BaseConditionInput {}

export class CandidateFeedbackItemContentQueryInput extends BaseQueryInput<
  CandidateFeedbackItemContentConditionInput,
  CandidateFeedbackItemContentPaginationInput
> {}
