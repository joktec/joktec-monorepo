import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerWorkExperienceInput implements IBaseInput {
  company!: string;

  detail!: string;

  @IsNotEmpty()
  position!: string;

  @IsNotEmpty()
  username!: string;

  deleted!: number;

  createBy!: string;

  createDate!: Date;

  endDate!: Date;

  lastUpdate!: Date;

  startDate!: Date;

  stillWorking!: number;

  updateBy!: string;

  industryId!: string;

  levelId!: string;

  yearExp!: string;

  positionDetail!: string;
}

export class CreateJobSeekerWorkExperienceInput extends BaseJobSeekerWorkExperienceInput implements IBaseCreateInput {}

export class UpdateJobSeekerWorkExperienceInput extends BaseJobSeekerWorkExperienceInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerWorkExperiencePaginationInput extends BasePaginationInput {}

export class JobSeekerWorkExperienceConditionInput extends BaseConditionInput {}

export class JobSeekerWorkExperienceQueryInput extends BaseQueryInput<
  JobSeekerWorkExperienceConditionInput,
  JobSeekerWorkExperiencePaginationInput
> {}
