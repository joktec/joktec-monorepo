import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerInterestDto extends BaseDto {
  interest!: string;

  updateBy!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  jobseekerId!: string;
}

export class JobSeekerInterestListReponseDto extends BaseListResponseDto<JobSeekerInterestDto> {}
