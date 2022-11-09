import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerJobAlertInput implements IBaseInput {
  @IsNotEmpty()
  key!: string;

  frequency!: string;

  @IsNotEmpty()
  email!: string;

  platform!: number;

  @IsNotEmpty()
  jobseekerId!: string;

  jobTitle!: string;

  locationIds!: string;

  isActive!: Number;

  alertVia!: string;

  createdAt!: Date;

  updatedAt!: Date;

  isGuest!: number;
}

export class CreateJobSeekerJobAlertInput extends BaseJobSeekerJobAlertInput implements IBaseCreateInput {}

export class UpdateJobSeekerJobAlertInput extends BaseJobSeekerJobAlertInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerJobAlertPaginationInput extends BasePaginationInput {}

export class JobSeekerJobAlertConditionInput extends BaseConditionInput {}

export class JobSeekerJobAlertQueryInput extends BaseQueryInput<
  JobSeekerJobAlertConditionInput,
  JobSeekerJobAlertPaginationInput
> {}
