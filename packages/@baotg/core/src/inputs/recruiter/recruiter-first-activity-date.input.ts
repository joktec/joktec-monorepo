import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseRecruiterFirstActivityDateInput implements IBaseInput {
  username!: string;

  createdDate!: Date;

  messageType!: string;

  device!: string;

  referer!: string;

  servletPath!: string;

  status!: string;

  statusCode!: number;
}

export class CreateRecruiterFirstActivityDateInput
  extends BaseRecruiterFirstActivityDateInput
  implements IBaseCreateInput {}

export class UpdateRecruiterFirstActivityDateInput
  extends BaseRecruiterFirstActivityDateInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class RecruiterFirstActivityDatePaginationInput extends BasePaginationInput {}

export class RecruiterFirstActivityDateConditionInput extends BaseConditionInput {}

export class RecruiterFirstActivityDateQueryInput extends BaseQueryInput<
  RecruiterFirstActivityDateConditionInput,
  RecruiterFirstActivityDatePaginationInput
> {}
