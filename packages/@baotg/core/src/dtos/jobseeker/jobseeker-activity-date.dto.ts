import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerActivityDateDto extends BaseDto {
  username!: string;

  device!: string;

  referer!: string;

  status!: string;

  createdDate!: Date;

  messageType!: string;

  servletPath!: string;

  statusCode!: number;
}

export class JobSeekerActivityDateListReponseDto extends BaseListResponseDto<JobSeekerActivityDateDto> {}
