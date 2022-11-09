import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerAddressGPlaceInput implements IBaseInput {
  country!: string;

  formattedAddress!: string;

  @IsNotEmpty()
  placeId!: string;

  administrativeAreaLevel1!: string;

  createdAt!: Date;

  updatedAt!: Date;

  @IsNotEmpty()
  jobseekerId!: string;

  countryShortCode!: string;
}

export class CreateJobSeekerAddressGPlaceInput extends BaseJobSeekerAddressGPlaceInput implements IBaseCreateInput {}

export class UpdateJobSeekerAddressGPlaceInput extends BaseJobSeekerAddressGPlaceInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerAddressGPlacePaginationInput extends BasePaginationInput {}

export class JobSeekerAddressGPlaceConditionInput extends BaseConditionInput {}

export class JobSeekerAddressGPlaceQueryInput extends BaseQueryInput<
  JobSeekerAddressGPlaceConditionInput,
  JobSeekerAddressGPlacePaginationInput
> {}
