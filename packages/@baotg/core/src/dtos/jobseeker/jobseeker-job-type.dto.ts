import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerJobTypeDto extends BaseDto {
  username!: string;

  createBy!: string;

  createDate!: Date;

  jobTypeId!: string;

  jobseekerId!: string;
}

export class JobSeekerJobTypeListReponseDto extends BaseListResponseDto<JobSeekerJobTypeDto> {}
