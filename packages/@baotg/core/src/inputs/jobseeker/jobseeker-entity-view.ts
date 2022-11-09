import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerEntityViewInput implements IBaseInput {
  keyword!: string;

  title!: string;

  image!: string;

  confidential!: number;

  entityType!: string;

  @IsNotEmpty()
  entityId!: string;

  publicId!: string;

  subTitle!: string;

  createdAt!: Date;

  updatedAt!: Date;

  @IsNotEmpty()
  jobseekerId!: string;

  customUrlCompany!: string;
}

export class CreateJobSeekerEntityViewInput extends BaseJobSeekerEntityViewInput implements IBaseCreateInput {}

export class UpdateJobSeekerEntityViewInput extends BaseJobSeekerEntityViewInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerEntityViewPaginationInput extends BasePaginationInput {}

export class JobSeekerEntityViewConditionInput extends BaseConditionInput {}

export class JobSeekerEntityViewQueryInput extends BaseQueryInput<
  JobSeekerEntityViewConditionInput,
  JobSeekerEntityViewPaginationInput
> {}
