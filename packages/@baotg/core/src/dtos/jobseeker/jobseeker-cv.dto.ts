import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerCvDto extends BaseDto {
  avatar!: string;

  deleted!: number;

  email!: string;

  fullname!: string;

  link!: string;

  phone!: string;

  username!: string;

  source!: string;

  tags!: string;

  JobSeekerCvId!: string;

  contentType!: string;

  fileSize!: number;

  lastUpdate!: Date;

  nameFile!: string;

  updateBy!: string;
}

export class JobSeekerCvListReponseDto extends BaseListResponseDto<JobSeekerCvDto> {}
