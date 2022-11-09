import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerJobReferralInput implements IBaseInput {
  @IsNotEmpty()
  referralId!: string;

  @IsNotEmpty()
  jobId!: string;

  @IsNotEmpty()
  jobseekerId!: string;

  createdAt!: Date;
}

export class CreateJobSeekerJobReferralInput extends BaseJobSeekerJobReferralInput implements IBaseCreateInput {}

export class UpdateJobSeekerJobReferralInput extends BaseJobSeekerJobReferralInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerJobReferralPaginationInput extends BasePaginationInput {}

export class JobSeekerJobReferralConditionInput extends BaseConditionInput {}

export class JobSeekerJobReferralQueryInput extends BaseQueryInput<
  JobSeekerJobReferralConditionInput,
  JobSeekerJobReferralPaginationInput
> {}
