import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterLastActivityDateInput implements IBaseInput {
  username!: string;

  messageType!: string;

  device!: string;

  referer!: string;

  servletPath!: string;

  status!: string;

  statusCode!: number;
}

export class CreateRecruiterLastActivityDateInput
  extends BaseRecruiterLastActivityDateInput
  implements IBaseCreateInput {}

export class UpdateRecruiterLastActivityDateInput
  extends BaseRecruiterLastActivityDateInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterLastActivityDatePaginationInput extends BasePaginationInput {}

export class RecruiterLastActivityDateConditionInput extends BaseConditionInput {}

export class RecruiterLastActivityDateQueryInput extends BaseQueryInput<
  RecruiterLastActivityDateConditionInput,
  RecruiterLastActivityDatePaginationInput
> {}
