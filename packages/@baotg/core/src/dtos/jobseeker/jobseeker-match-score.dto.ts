import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerMatchScoreDto extends BaseDto {
  cvId!: string;

  jobId!: string;

  matchScore!: number;

  createdAt!: Date;

  updatedAt!: Date;

  createdBy!: string;

  updatedBy!: string;
}

export class JobSeekerMatchScoreListReponseDto extends BaseListResponseDto<JobSeekerMatchScoreDto> {}
