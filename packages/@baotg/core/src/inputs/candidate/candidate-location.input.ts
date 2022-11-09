import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseCandidateLocationInput implements IBaseInput {
  @IsNotEmpty()
  candidateId!: string;

  @IsNotEmpty()
  locationId!: number;
}

export class CreateCandidateLocationInput extends BaseCandidateLocationInput implements IBaseCreateInput {}

export class UpdateCandidateLocationInput extends BaseCandidateLocationInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateLocationPaginationInput extends BasePaginationInput {}

export class CandidateLocationConditionInput extends BaseConditionInput {}

export class CandidateLocationQueryInput extends BaseQueryInput<
  CandidateLocationConditionInput,
  CandidateLocationPaginationInput
> {}
