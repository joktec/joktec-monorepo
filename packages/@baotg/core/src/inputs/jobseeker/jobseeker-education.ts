import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerEducationInput implements IBaseInput {
  college!: string;

  deleted!: number;

  detail!: string;

  major!: string;

  @IsNotEmpty()
  username!: string;

  GPA!: number;

  cityId!: string;

  createBy!: string;

  createDate!: Date;

  degreeId!: string;

  endDate!: Date;

  lastUpdate!: Date;

  startDate!: Date;

  updateBy!: string;

  stillStudying!: number;

  gpaExtra!: string;

  @IsNotEmpty()
  jobseekerId!: string;
}

export class CreateJobSeekerEducationInput extends BaseJobSeekerEducationInput implements IBaseCreateInput {}

export class UpdateJobSeekerEducationInput extends BaseJobSeekerEducationInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerEducationPaginationInput extends BasePaginationInput {}

export class JobSeekerEducationConditionInput extends BaseConditionInput {}

export class JobSeekerEducationQueryInput extends BaseQueryInput<
  JobSeekerEducationConditionInput,
  JobSeekerEducationPaginationInput
> {}
