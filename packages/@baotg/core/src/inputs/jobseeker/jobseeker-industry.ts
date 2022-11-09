import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerIndustryInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  createBy!: string;

  createDate!: Date;

  @IsNotEmpty()
  industryId!: string;

  @IsNotEmpty()
  jobseekerId!: string;
}

export class CreateJobSeekerIndustryInput extends BaseJobSeekerIndustryInput implements IBaseCreateInput {}

export class UpdateJobSeekerIndustryInput extends BaseJobSeekerIndustryInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerIndustryPaginationInput extends BasePaginationInput {}

export class JobSeekerIndustryConditionInput extends BaseConditionInput {}

export class JobSeekerIndustryQueryInput extends BaseQueryInput<
  JobSeekerIndustryConditionInput,
  JobSeekerIndustryPaginationInput
> {}
