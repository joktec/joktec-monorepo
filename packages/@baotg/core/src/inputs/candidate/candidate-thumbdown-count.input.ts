import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidateThumbdownCountInput implements IBaseInput {
  @IsNotEmpty()
  tickOn!: number;

  @IsNotEmpty()
  candidateId!: string;

  @IsNotEmpty()
  jobId!: string;

  @IsNotEmpty()
  userId!: string;
}

export class CreateCandidateThumbdownCountInput extends BaseCandidateThumbdownCountInput implements IBaseCreateInput {}

export class UpdateCandidateThumbdownCountInput extends BaseCandidateThumbdownCountInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateThumbdownCountPaginationInput extends BasePaginationInput {}

export class CandidateThumbdownCountConditionInput extends BaseConditionInput {}

export class CandidateThumbdownCountQueryInput extends BaseQueryInput<
  CandidateThumbdownCountConditionInput,
  CandidateThumbdownCountPaginationInput
> {}
