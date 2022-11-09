import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerViewProfileInput implements IBaseInput {
  @IsNotEmpty()
  viewerId!: string;

  @IsNotEmpty()
  viewerUsername!: string;

  @IsNotEmpty()
  profileId!: string;

  @IsNotEmpty()
  profileUsername!: string;

  createdAt!: Date;

  viewAt!: Date;
}

export class CreateJobSeekerViewProfileInput extends BaseJobSeekerViewProfileInput implements IBaseCreateInput {}

export class UpdateJobSeekerViewProfileInput extends BaseJobSeekerViewProfileInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerViewProfilePaginationInput extends BasePaginationInput {}

export class JobSeekerViewProfileConditionInput extends BaseConditionInput {}

export class JobSeekerViewProfileQueryInput extends BaseQueryInput<
  JobSeekerViewProfileConditionInput,
  JobSeekerViewProfilePaginationInput
> {}
