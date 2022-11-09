import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerCvInput implements IBaseInput {
  avatar!: string;

  deleted!: number;

  @IsNotEmpty()
  email!: string;

  fullname!: string;

  link!: string;

  phone!: string;

  @IsNotEmpty()
  username!: string;

  source!: string;

  tags!: string;

  @IsNotEmpty()
  jobseekerCvId!: string;

  contentType!: string;

  fileSize!: number;

  lastUpdate!: Date;

  nameFile!: string;

  updateBy!: string;
}

export class CreateJobSeekerCvInput extends BaseJobSeekerCvInput implements IBaseCreateInput {}

export class UpdateJobSeekerCvInput extends BaseJobSeekerCvInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerCvPaginationInput extends BasePaginationInput {}

export class JobSeekerCvConditionInput extends BaseConditionInput {}

export class JobSeekerCvQueryInput extends BaseQueryInput<JobSeekerCvConditionInput, JobSeekerCvPaginationInput> {}
