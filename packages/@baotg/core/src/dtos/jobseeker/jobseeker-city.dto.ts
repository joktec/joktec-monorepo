import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerCityDto extends BaseDto {
  username!: string;

  cityId!: string;

  createBy!: string;

  createDate!: Date;
}

export class JobSeekerCityListReponseDto extends BaseListResponseDto<JobSeekerCityDto> {}
