import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerLanguageDto extends BaseDto {
  language!: string;

  level!: string;

  username!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  updateBy!: string;
}

export class JobSeekerLanguageListReponseDto extends BaseListResponseDto<JobSeekerLanguageDto> {}
