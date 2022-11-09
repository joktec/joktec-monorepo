import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerLevelExpectedDto extends BaseDto {
  levelId!: string;

  createdAt!: Date;

  updatedAt!: Date;

  jobseekerId!: string;
}

export class JobSeekerLevelExpectedListReponseDto extends BaseListResponseDto<JobSeekerLevelExpectedDto> {}
