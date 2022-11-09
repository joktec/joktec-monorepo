import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerDirectlyApplyDto extends BaseDto {
  applyDate!: Date;

  createDate!: Date;

  cvId!: string;

  hopScore!: number;

  jobId!: string;

  jobVersionId!: string;

  jsId!: string;

  applyBy!: string;

  applyType!: string;
}

export class JobSeekerDirectlyApplyListReponseDto extends BaseListResponseDto<JobSeekerDirectlyApplyDto> {}
