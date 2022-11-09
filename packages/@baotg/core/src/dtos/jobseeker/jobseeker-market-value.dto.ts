import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerMarketValueDto extends BaseDto {
  username!: string;

  jobseekerId!: string;

  cvId!: string;

  isJhProfile!: number;

  marketValue!: number;

  nearestMarketValue!: number;

  metaData!: string;

  createdAt!: Date;

  updatedAt!: Date;

  createdBy!: string;

  updatedBy!: string;
}

export class JobSeekerMarketValueListReponseDto extends BaseListResponseDto<JobSeekerMarketValueDto> {}
