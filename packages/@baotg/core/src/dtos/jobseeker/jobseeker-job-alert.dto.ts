import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerJobAlertDto extends BaseDto {
  key!: string;

  frequency!: string;

  email!: string;

  platform!: number;

  jobseekerId!: string;

  jobTitle!: string;

  locationIds!: string;

  alertVia!: string;

  createdAt!: Date;

  updatedAt!: Date;

  isGuest!: number;
}

export class JobSeekerJobAlertListReponseDto extends BaseListResponseDto<JobSeekerJobAlertDto> {}
