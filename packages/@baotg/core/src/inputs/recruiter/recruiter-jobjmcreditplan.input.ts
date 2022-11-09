import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterJobjmcreditplanInput implements IBaseInput {
  name!: string;

  weeklyProcessedCv!: number;

  dailyImporession!: string;
}

export class CreateRecruiterJobjmcreditplanInput
  extends BaseRecruiterJobjmcreditplanInput
  implements IBaseCreateInput {}

export class UpdateRecruiterJobjmcreditplanInput extends BaseRecruiterJobjmcreditplanInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterJobjmcreditplanPaginationInput extends BasePaginationInput {}

export class RecruiterJobjmcreditplanConditionInput extends BaseConditionInput {}

export class RecruiterJobjmcreditplanQueryInput extends BaseQueryInput<
  RecruiterJobjmcreditplanConditionInput,
  RecruiterJobjmcreditplanPaginationInput
> {}
