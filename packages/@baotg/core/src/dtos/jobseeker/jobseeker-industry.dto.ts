import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerIndustryDto extends BaseDto {
  username!: string;

  createBy!: string;

  createDate!: Date;

  industryId!: string;

  jobseekerId!: string;
}

export class JobSeekerIndustryListReponseDto extends BaseListResponseDto<JobSeekerIndustryDto> {}
