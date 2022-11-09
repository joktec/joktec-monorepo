import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerRecommendationJobsInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  score!: number;

  @IsNotEmpty()
  jobseekerId!: string;

  @IsNotEmpty()
  jobId!: string;

  createdAt!: Date;

  cvId!: string;
}

export class CreateJobSeekerRecommendationJobsInput
  extends BaseJobSeekerRecommendationJobsInput
  implements IBaseCreateInput {}

export class UpdateJobSeekerRecommendationJobsInput
  extends BaseJobSeekerRecommendationJobsInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerRecommendationJobsPaginationInput extends BasePaginationInput {}

export class JobSeekerRecommendationJobsConditionInput extends BaseConditionInput {}

export class JobSeekerRecommendationJobsQueryInput extends BaseQueryInput<
  JobSeekerRecommendationJobsConditionInput,
  JobSeekerRecommendationJobsPaginationInput
> {}
