import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidatePerferenceHistoryInput implements IBaseInput {
  jobId!: string;

  jobName!: string;

  user!: string;

  action!: string;
}

export class CreateCandidatePerferenceHistoryInput
  extends BaseCandidatePerferenceHistoryInput
  implements IBaseCreateInput {}

export class UpdateCandidatePerferenceHistoryInput
  extends BaseCandidatePerferenceHistoryInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidatePerferenceHistoryPaginationInput extends BasePaginationInput {}

export class CandidatePerferenceHistoryConditionInput extends BaseConditionInput {}

export class CandidatePerferenceHistoryQueryInput extends BaseQueryInput<
  CandidatePerferenceHistoryConditionInput,
  CandidatePerferenceHistoryPaginationInput
> {}
