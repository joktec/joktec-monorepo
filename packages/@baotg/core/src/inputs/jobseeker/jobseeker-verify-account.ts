import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerVerifyAccountInput implements IBaseInput {
  note!: string;

  verifyMethod!: string;

  identityCardId!: string;

  isVerified!: number;

  approvedById!: string;

  createdAt!: Date;

  updatedAt!: Date;

  @IsNotEmpty()
  jobseekerId!: string;

  companyEmail!: string;

  updatedBy!: string;
}

export class CreateJobSeekerVerifyAccountInput extends BaseJobSeekerVerifyAccountInput implements IBaseCreateInput {}

export class UpdateJobSeekerVerifyAccountInput extends BaseJobSeekerVerifyAccountInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerVerifyAccountPaginationInput extends BasePaginationInput {}

export class JobSeekerVerifyAccountConditionInput extends BaseConditionInput {}

export class JobSeekerVerifyAccountQueryInput extends BaseQueryInput<
  JobSeekerVerifyAccountConditionInput,
  JobSeekerVerifyAccountPaginationInput
> {}
