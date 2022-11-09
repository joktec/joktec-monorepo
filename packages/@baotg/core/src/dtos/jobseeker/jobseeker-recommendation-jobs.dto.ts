import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerRecommendationJobsDto extends BaseDto {
  username!: string;

  score!: number;

  jobseekerId!: string;

  jobId!: string;

  createdAt!: Date;

  cvId!: string;
}

export class JobSeekerRecommendationJobsListReponseDto extends BaseListResponseDto<JobSeekerRecommendationJobsDto> {}
