import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerReferenceDto extends BaseDto {
  name!: string;

  title!: string;

  email!: string;

  username!: string;

  phoneNumber!: string;

  companyName!: string;

  updateBy!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;
}

export class JobSeekerReferenceListReponseDto extends BaseListResponseDto<JobSeekerReferenceDto> {}
