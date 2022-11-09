import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterCandidatestatusmessageInput implements IBaseInput {
  status!: string;

  vi!: string;

  en!: string;

  titleEn!: string;

  titleVi!: string;
}

export class CreateRecruiterCandidatestatusmessageInput
  extends BaseRecruiterCandidatestatusmessageInput
  implements IBaseCreateInput {}

export class UpdateRecruiterCandidatestatusmessageInput
  extends BaseRecruiterCandidatestatusmessageInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterCandidatestatusmessagePaginationInput extends BasePaginationInput {}

export class RecruiterCandidatestatusmessageConditionInput extends BaseConditionInput {}

export class RecruiterCandidatestatusmessageQueryInput extends BaseQueryInput<
  RecruiterCandidatestatusmessageConditionInput,
  RecruiterCandidatestatusmessagePaginationInput
> {}
