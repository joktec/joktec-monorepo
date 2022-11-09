import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerDistrictInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  createBy!: string;

  createDate!: Date;

  @IsNotEmpty()
  districtId!: string;
}

export class CreateJobSeekerDistrictInput extends BaseJobSeekerDistrictInput implements IBaseCreateInput {}

export class UpdateJobSeekerDistrictInput extends BaseJobSeekerDistrictInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerDistrictPaginationInput extends BasePaginationInput {}

export class JobSeekerDistrictConditionInput extends BaseConditionInput {}

export class JobSeekerDistrictQueryInput extends BaseQueryInput<
  JobSeekerDistrictConditionInput,
  JobSeekerDistrictPaginationInput
> {}
