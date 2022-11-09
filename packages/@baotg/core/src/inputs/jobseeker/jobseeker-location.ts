import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerLocationInput implements IBaseInput {
  createdOn!: Date;

  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  locationId!: number;

  @IsNotEmpty()
  jobseekerId!: string;
}

export class CreateJobSeekerLocationInput extends BaseJobSeekerLocationInput implements IBaseCreateInput {}

export class UpdateJobSeekerLocationInput extends BaseJobSeekerLocationInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerLocationPaginationInput extends BasePaginationInput {}

export class JobSeekerLocationConditionInput extends BaseConditionInput {}

export class JobSeekerLocationQueryInput extends BaseQueryInput<
  JobSeekerLocationConditionInput,
  JobSeekerLocationPaginationInput
> {}
