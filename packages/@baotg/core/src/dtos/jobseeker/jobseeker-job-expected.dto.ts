import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerJobExpectedDto extends BaseDto {
  title!: string;

  jobseekerId!: string;

  createdAt!: Date;

  aiStatusCode!: number;

  aiUpdatedAt!: string;

  skillsVectorEmbedding!: string;

  vectorEmbedding!: string;

  updatedAt!: Date;
}

export class JobSeekerJobExpectedListReponseDto extends BaseListResponseDto<JobSeekerJobExpectedDto> {}
