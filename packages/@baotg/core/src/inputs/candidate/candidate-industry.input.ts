import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseCandidateIndustryInput implements IBaseInput {
  @IsNotEmpty()
  candidateId!: string;

  @IsNotEmpty()
  industryId!: string;
}

export class CreateCandidateIndustryInput extends BaseCandidateIndustryInput implements IBaseCreateInput {}

export class UpdateCandidateIndustryInput extends BaseCandidateIndustryInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateIndustryPaginationInput extends BasePaginationInput {}

export class CandidateIndustryConditionInput extends BaseConditionInput {}

export class CandidateIndustryQueryInput extends BaseQueryInput<
  CandidateIndustryConditionInput,
  CandidateIndustryPaginationInput
> {}
