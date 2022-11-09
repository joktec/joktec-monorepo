import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerDirectlyApplyInput implements IBaseInput {
  applyDate!: Date;

  createDate!: Date;

  @IsNotEmpty()
  cvId!: string;

  hopScore!: number;

  @IsNotEmpty()
  jobId!: string;

  jobVersionId!: string;

  jsId!: string;

  applyBy!: string;

  applyType!: string;
}

export class CreateJobSeekerDirectlyApplyInput extends BaseJobSeekerDirectlyApplyInput implements IBaseCreateInput {}

export class UpdateJobSeekerDirectlyApplyInput extends BaseJobSeekerDirectlyApplyInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerDirectlyApplyPaginationInput extends BasePaginationInput {}

export class JobSeekerDirectlyApplyConditionInput extends BaseConditionInput {}

export class JobSeekerDirectlyApplyQueryInput extends BaseQueryInput<
  JobSeekerDirectlyApplyConditionInput,
  JobSeekerDirectlyApplyPaginationInput
> {}
