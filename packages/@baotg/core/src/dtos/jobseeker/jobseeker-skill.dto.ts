import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerSkillDto extends BaseDto {
  level!: string;

  skill!: string;

  username!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  updateBy!: string;
}

export class JobSeekerSkillListReponseDto extends BaseListResponseDto<JobSeekerSkillDto> {}
