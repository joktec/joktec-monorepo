import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerJobFunctionDto extends BaseDto {
  createDate!: Date;

  jobFunction!: string;

  jobseekerId!: string;
}

export class JobSeekerJobFunctionListReponseDto extends BaseListResponseDto<JobSeekerJobFunctionDto> {}
