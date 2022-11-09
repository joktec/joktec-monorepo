import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerJobReferralDto extends BaseDto {
  referralId!: string;

  jobId!: string;

  jobseekerId!: string;

  createdAt!: Date;
}

export class JobSeekerJobReferralListReponseDto extends BaseListResponseDto<JobSeekerJobReferralDto> {}
