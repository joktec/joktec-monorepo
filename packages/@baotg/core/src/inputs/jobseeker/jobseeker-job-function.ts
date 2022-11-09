import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerJobFunctionInput implements IBaseInput {
  createDate!: Date;

  jobFunction!: string;

  @IsNotEmpty()
  jobseekerId!: string;
}

export class CreateJobSeekerJobFunctionInput extends BaseJobSeekerJobFunctionInput implements IBaseCreateInput {}

export class UpdateJobSeekerJobFunctionInput extends BaseJobSeekerJobFunctionInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerJobFunctionPaginationInput extends BasePaginationInput {}

export class JobSeekerJobFunctionConditionInput extends BaseConditionInput {}

export class JobSeekerJobFunctionQueryInput extends BaseQueryInput<
  JobSeekerJobFunctionConditionInput,
  JobSeekerJobFunctionPaginationInput
> {}
