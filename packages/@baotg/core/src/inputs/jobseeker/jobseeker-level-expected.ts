import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerLevelExpectedInput implements IBaseInput {
  @IsNotEmpty()
  levelId!: string;

  createdAt!: Date;

  updatedAt!: Date;

  @IsNotEmpty()
  jobseekerId!: string;
}

export class CreateJobSeekerLevelExpectedInput extends BaseJobSeekerLevelExpectedInput implements IBaseCreateInput {}

export class UpdateJobSeekerLevelExpectedInput extends BaseJobSeekerLevelExpectedInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerLevelExpectedPaginationInput extends BasePaginationInput {}

export class JobSeekerLevelExpectedConditionInput extends BaseConditionInput {}

export class JobSeekerLevelExpectedQueryInput extends BaseQueryInput<
  JobSeekerLevelExpectedConditionInput,
  JobSeekerLevelExpectedPaginationInput
> {}
