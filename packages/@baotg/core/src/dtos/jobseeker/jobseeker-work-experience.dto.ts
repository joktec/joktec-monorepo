import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerWorkExperienceDto extends BaseDto {
  company!: string;

  detail!: string;

  position!: string;

  username!: string;

  deleted!: number;

  createBy!: string;

  createDate!: Date;

  endDate!: Date;

  lastUpdate!: Date;

  startDate!: Date;

  stillWorking!: number;

  updateBy!: string;

  industryId!: string;

  levelId!: string;

  yearExp!: string;

  positionDetail!: string;
}

export class JobSeekerWorkExperienceListReponseDto extends BaseListResponseDto<JobSeekerWorkExperienceDto> {}
