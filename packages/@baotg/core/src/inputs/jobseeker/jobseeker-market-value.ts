import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerMarketValueInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  jobseekerId!: string;

  cvId!: string;

  isJhProfile!: number;

  marketValue!: number;

  nearestMarketValue!: number;

  metaData!: string;

  createdAt!: Date;

  updatedAt!: Date;

  createdBy!: string;

  updatedBy!: string;
}

export class CreateJobSeekerMarketValueInput extends BaseJobSeekerMarketValueInput implements IBaseCreateInput {}

export class UpdateJobSeekerMarketValueInput extends BaseJobSeekerMarketValueInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerMarketValuePaginationInput extends BasePaginationInput {}

export class JobSeekerMarketValueConditionInput extends BaseConditionInput {}

export class JobSeekerMarketValueQueryInput extends BaseQueryInput<
  JobSeekerMarketValueConditionInput,
  JobSeekerMarketValuePaginationInput
> {}
