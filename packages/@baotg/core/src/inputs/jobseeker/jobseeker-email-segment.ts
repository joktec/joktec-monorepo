import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerEmailSegmentInput implements IBaseInput {
  segmentName!: string;

  latestTrigger!: string;

  createdAt!: Date;

  updatedAt!: string;

  routineId!: string;
}

export class CreateJobSeekerEmailSegmentInput extends BaseJobSeekerEmailSegmentInput implements IBaseCreateInput {}

export class UpdateJobSeekerEmailSegmentInput extends BaseJobSeekerEmailSegmentInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerEmailSegmentPaginationInput extends BasePaginationInput {}

export class JobSeekerEmailSegmentConditionInput extends BaseConditionInput {}

export class JobSeekerEmailSegmentQueryInput extends BaseQueryInput<
  JobSeekerEmailSegmentConditionInput,
  JobSeekerEmailSegmentPaginationInput
> {}
