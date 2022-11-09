import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerJobSavedInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  jobId!: string;

  lastUpdate!: Date;
}

export class CreateJobSeekerJobSavedInput extends BaseJobSeekerJobSavedInput implements IBaseCreateInput {}

export class UpdateJobSeekerJobSavedInput extends BaseJobSeekerJobSavedInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerJobSavedPaginationInput extends BasePaginationInput {}

export class JobSeekerJobSavedConditionInput extends BaseConditionInput {}

export class JobSeekerJobSavedQueryInput extends BaseQueryInput<
  JobSeekerJobSavedConditionInput,
  JobSeekerJobSavedPaginationInput
> {}
