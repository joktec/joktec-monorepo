import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerCareerInterestCardInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  jobseekerId!: string;

  jobTitle!: string;

  locationId!: string;

  createdAt!: Date;

  updatedAt!: Date;

  isDeleted!: number;

  jobExpectId!: string;
}

export class CreateJobSeekerCareerInterestCardInput
  extends BaseJobSeekerCareerInterestCardInput
  implements IBaseCreateInput {}

export class UpdateJobSeekerCareerInterestCardInput
  extends BaseJobSeekerCareerInterestCardInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerCareerInterestCardPaginationInput extends BasePaginationInput {}

export class JobSeekerCareerInterestCardConditionInput extends BaseConditionInput {}

export class JobSeekerCareerInterestCardQueryInput extends BaseQueryInput<
  JobSeekerCareerInterestCardConditionInput,
  JobSeekerCareerInterestCardPaginationInput
> {}
