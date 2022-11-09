import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerInterestInput implements IBaseInput {
  @IsNotEmpty()
  interest!: string;

  updateBy!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  @IsNotEmpty()
  jobseekerId!: string;
}

export class CreateJobSeekerInterestInput extends BaseJobSeekerInterestInput implements IBaseCreateInput {}

export class UpdateJobSeekerInterestInput extends BaseJobSeekerInterestInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerInterestPaginationInput extends BasePaginationInput {}

export class JobSeekerInterestConditionInput extends BaseConditionInput {}

export class JobSeekerInterestQueryInput extends BaseQueryInput<
  JobSeekerInterestConditionInput,
  JobSeekerInterestPaginationInput
> {}
