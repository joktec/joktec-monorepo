import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerJobSavedDto extends BaseDto {
  username!: string;

  jobId!: string;

  lastUpdate!: Date;
}

export class JobSeekerJobSavedListReponseDto extends BaseListResponseDto<JobSeekerJobSavedDto> {}
