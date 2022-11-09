import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCandidateLinkInput implements IBaseInput {
  linkId!: string;

  candidateId!: string;

  name!: string;
}

export class CreateCandidateLinkInput extends BaseCandidateLinkInput implements IBaseCreateInput {}

export class UpdateCandidateLinkInput extends BaseCandidateLinkInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class CandidateLinkPaginationInput extends BasePaginationInput {}

export class CandidateLinkConditionInput extends BaseConditionInput {}

export class CandidateLinkQueryInput extends BaseQueryInput<
  CandidateLinkConditionInput,
  CandidateLinkPaginationInput
> {}
