import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerSegmentRoutineInput implements IBaseInput {
  routineName!: string;

  templateOrder!: string;

  isActive!: number;

  isDefault!: number;

  createdAt!: Date;

  updatedAt!: Date;
}

export class CreateJobSeekerSegmentRoutineInput extends BaseJobSeekerSegmentRoutineInput implements IBaseCreateInput {}

export class UpdateJobSeekerSegmentRoutineInput extends BaseJobSeekerSegmentRoutineInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerSegmentRoutinePaginationInput extends BasePaginationInput {}

export class JobSeekerSegmentRoutineConditionInput extends BaseConditionInput {}

export class JobSeekerSegmentRoutineQueryInput extends BaseQueryInput<
  JobSeekerSegmentRoutineConditionInput,
  JobSeekerSegmentRoutinePaginationInput
> {}
