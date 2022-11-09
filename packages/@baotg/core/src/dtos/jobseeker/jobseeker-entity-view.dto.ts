import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerEntityViewDto extends BaseDto {
  keyword!: string;

  title!: string;

  image!: string;

  confidential!: number;

  entityType!: string;

  entityId!: string;

  publicId!: string;

  subTitle!: string;

  createdAt!: Date;

  updatedAt!: Date;

  jobseekerId!: string;

  customUrlCompany!: string;
}

export class JobSeekerEntityViewListReponseDto extends BaseListResponseDto<JobSeekerEntityViewDto> {}
