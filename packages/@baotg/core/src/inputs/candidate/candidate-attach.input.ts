import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidateAttachInput implements IBaseInput {
  candidateId!: string;

  contentType!: string;

  @IsNotEmpty()
  fileSize!: number;

  link!: string;

  name!: string;

  deleted!: number;

  oldCandidateId!: string;
}

export class CreateCandidateAttachInput extends BaseCandidateAttachInput implements IBaseCreateInput {}

export class UpdateCandidateAttachInput extends BaseCandidateAttachInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateAttachPaginationInput extends BasePaginationInput {}

export class CandidateAttachConditionInput extends BaseConditionInput {}

export class CandidateAttachQueryInput extends BaseQueryInput<
  CandidateAttachConditionInput,
  CandidateAttachPaginationInput
> {}
