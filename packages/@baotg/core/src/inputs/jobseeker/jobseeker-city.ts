import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerCityInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  cityId!: string;

  createBy!: string;

  createDate!: Date;
}

export class CreateJobSeekerCityInput extends BaseJobSeekerCityInput implements IBaseCreateInput {}

export class UpdateJobSeekerCityInput extends BaseJobSeekerCityInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerCityPaginationInput extends BasePaginationInput {}

export class JobSeekerCityConditionInput extends BaseConditionInput {}

export class JobSeekerCityQueryInput extends BaseQueryInput<
  JobSeekerCityConditionInput,
  JobSeekerCityPaginationInput
> {}
