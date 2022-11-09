import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerCrawlerDto extends BaseDto {
  email!: string;

  source!: number;

  crawlerId!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  phoneNumber!: string;

  updateBy!: string;
}

export class JobSeekerCrawlerListReponseDto extends BaseListResponseDto<JobSeekerCrawlerDto> {}
