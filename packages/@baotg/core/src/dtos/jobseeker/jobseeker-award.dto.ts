import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerAwardDto extends BaseDto {
  name!: string;

  organization!: string;

  username!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  receiveTime!: Date;

  updateBy!: string;
}

export class JobSeekerAwardListReponseDto extends BaseListResponseDto<JobSeekerAwardDto> {}
