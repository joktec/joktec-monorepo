import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerJobTypeInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  createBy!: string;

  createDate!: Date;

  @IsNotEmpty()
  jobTypeId!: string;

  @IsNotEmpty()
  jobseekerId!: string;
}

export class CreateJobSeekerJobTypeInput extends BaseJobSeekerJobTypeInput implements IBaseCreateInput {}

export class UpdateJobSeekerJobTypeInput extends BaseJobSeekerJobTypeInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerJobTypePaginationInput extends BasePaginationInput {}

export class JobSeekerJobTypeConditionInput extends BaseConditionInput {}

export class JobSeekerJobTypeQueryInput extends BaseQueryInput<
  JobSeekerJobTypeConditionInput,
  JobSeekerJobTypePaginationInput
> {}
