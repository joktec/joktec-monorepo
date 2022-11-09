import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerActivityDateInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  device!: string;

  referer!: string;

  status!: string;

  createdDate!: Date;

  messageType!: string;

  servletPath!: string;

  statusCode!: number;
}

export class CreateJobSeekerActivityDateInput extends BaseJobSeekerActivityDateInput implements IBaseCreateInput {}

export class UpdateJobSeekerActivityDateInput extends BaseJobSeekerActivityDateInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerActivityDatePaginationInput extends BasePaginationInput {}

export class JobSeekerActivityDateConditionInput extends BaseConditionInput {}

export class JobSeekerActivityDateQueryInput extends BaseQueryInput<
  JobSeekerActivityDateConditionInput,
  JobSeekerActivityDatePaginationInput
> {}
