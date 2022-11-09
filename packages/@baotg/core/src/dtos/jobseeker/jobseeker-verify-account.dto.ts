import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerVerifyAccountDto extends BaseDto {
  note!: string;

  verifyMethod!: string;

  identityCardId!: string;

  isVerified!: number;

  approvedById!: string;

  createdAt!: Date;

  updatedAt!: Date;

  jobseekerId!: string;

  companyEmail!: string;

  updatedBy!: string;
}

export class JobSeekerVerifyAccountListReponseDto extends BaseListResponseDto<JobSeekerVerifyAccountDto> {}
