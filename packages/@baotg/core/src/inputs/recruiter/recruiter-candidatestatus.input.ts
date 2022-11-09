import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterCandidatestatusInput implements IBaseInput {
  status!: string;

  notes!: string;

  candidateId!: string;

  acceptInterview!: number;

  interviewId!: string;
}

export class CreateRecruiterCandidatestatusInput
  extends BaseRecruiterCandidatestatusInput
  implements IBaseCreateInput {}

export class UpdateRecruiterCandidatestatusInput extends BaseRecruiterCandidatestatusInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterCandidatestatusPaginationInput extends BasePaginationInput {}

export class RecruiterCandidatestatusConditionInput extends BaseConditionInput {}

export class RecruiterCandidatestatusQueryInput extends BaseQueryInput<
  RecruiterCandidatestatusConditionInput,
  RecruiterCandidatestatusPaginationInput
> {}
