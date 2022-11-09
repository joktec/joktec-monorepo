import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerLocationDto extends BaseDto {
  createdOn!: Date;

  userId!: string;

  locationId!: number;

  jobseekerId!: string;
}

export class JobSeekerLocationListReponseDto extends BaseListResponseDto<JobSeekerLocationDto> {}
