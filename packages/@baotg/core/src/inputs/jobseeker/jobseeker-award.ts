import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerAwardInput implements IBaseInput {
  name!: string;

  organization!: string;

  @IsNotEmpty()
  username!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  receiveTime!: Date;

  updateBy!: string;
}

export class CreateJobSeekerAwardInput extends BaseJobSeekerAwardInput implements IBaseCreateInput {}

export class UpdateJobSeekerAwardInput extends BaseJobSeekerAwardInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerAwardPaginationInput extends BasePaginationInput {}

export class JobSeekerAwardConditionInput extends BaseConditionInput {}

export class JobSeekerAwardQueryInput extends BaseQueryInput<
  JobSeekerAwardConditionInput,
  JobSeekerAwardPaginationInput
> {}
