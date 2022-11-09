import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidateCompanyTypeInput implements IBaseInput {
  @IsNotEmpty()
  candidateId!: string;

  @IsNotEmpty()
  companyTypeId!: number;
}

export class CreateCandidateCompanyTypeInput extends BaseCandidateCompanyTypeInput implements IBaseCreateInput {}

export class UpdateCandidateCompanyTypeInput extends BaseCandidateCompanyTypeInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateCompanyTypePaginationInput extends BasePaginationInput {}

export class CandidateCompanyTypeConditionInput extends BaseConditionInput {}

export class CandidateCompanyTypeQueryInput extends BaseQueryInput<
  CandidateCompanyTypeConditionInput,
  CandidateCompanyTypePaginationInput
> {}
