import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerFollowedOrganizationInput implements IBaseInput {
  following!: number;

  @IsNotEmpty()
  jobseekerId!: string;

  @IsNotEmpty()
  organizationId!: string;

  emailSubscribed!: number;

  numberOfFollowTime!: number;

  createdAt!: Date;

  updatedAt!: Date;
}

export class CreateJobSeekerFollowedOrganizationInput
  extends BaseJobSeekerFollowedOrganizationInput
  implements IBaseCreateInput {}

export class UpdateJobSeekerFollowedOrganizationInput
  extends BaseJobSeekerFollowedOrganizationInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerFollowedOrganizationPaginationInput extends BasePaginationInput {}

export class JobSeekerFollowedOrganizationConditionInput extends BaseConditionInput {}

export class JobSeekerFollowedOrganizationQueryInput extends BaseQueryInput<
  JobSeekerFollowedOrganizationConditionInput,
  JobSeekerFollowedOrganizationPaginationInput
> {}
