import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerEmailSegmentDto extends BaseDto {
  segmentName!: string;

  latestTrigger!: string;

  createdAt!: Date;

  routineId!: string;
}

export class JobSeekerEmailSegmentListReponseDto extends BaseListResponseDto<JobSeekerEmailSegmentDto> {}
