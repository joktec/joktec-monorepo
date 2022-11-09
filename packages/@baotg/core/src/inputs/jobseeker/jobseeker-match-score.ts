import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerMatchScoreInput implements IBaseInput {
  @IsNotEmpty()
  cvId!: string;

  @IsNotEmpty()
  jobId!: string;

  matchScore!: number;

  createdAt!: Date;

  updatedAt!: Date;

  createdBy!: string;

  updatedBy!: string;
}

export class CreateJobSeekerMatchScoreInput extends BaseJobSeekerMatchScoreInput implements IBaseCreateInput {}

export class UpdateJobSeekerMatchScoreInput extends BaseJobSeekerMatchScoreInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerMatchScorePaginationInput extends BasePaginationInput {}

export class JobSeekerMatchScoreConditionInput extends BaseConditionInput {}

export class JobSeekerMatchScoreQueryInput extends BaseQueryInput<
  JobSeekerMatchScoreConditionInput,
  JobSeekerMatchScorePaginationInput
> {}
