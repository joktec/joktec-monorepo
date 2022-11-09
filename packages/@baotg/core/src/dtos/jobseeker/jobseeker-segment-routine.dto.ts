import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerSegmentRoutineDto extends BaseDto {
  routineName!: string;

  templateOrder!: string;

  isActive!: number;

  isDefault!: number;

  createdAt!: Date;

  updatedAt!: Date;
}

export class JobSeekerSegmentRoutineListReponseDto extends BaseListResponseDto<JobSeekerSegmentRoutineDto> {}
