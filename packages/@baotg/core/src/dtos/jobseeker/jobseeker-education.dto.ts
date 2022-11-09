import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerEducationDto extends BaseDto {
  college!: string;

  deleted!: number;

  detail!: string;

  major!: string;

  username!: string;

  GPA!: number;

  cityId!: string;

  createBy!: string;

  createDate!: Date;

  degreeId!: string;

  endDate!: Date;

  lastUpdate!: Date;

  startDate!: Date;

  updateBy!: string;

  stillStudying!: number;

  gpaExtra!: string;

  jobseekerId!: string;
}

export class JobSeekerEducationListReponseDto extends BaseListResponseDto<JobSeekerEducationDto> {}
