import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerDistrictDto extends BaseDto {
  username!: string;

  createBy!: string;

  createDate!: Date;

  districtId!: string;
}

export class JobSeekerDistrictListReponseDto extends BaseListResponseDto<JobSeekerDistrictDto> {}
