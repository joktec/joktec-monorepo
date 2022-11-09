import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerCvEmailSegmentDto extends BaseDto {
  email!: string;

  cvId!: string;

  fullName!: string;

  accountActivated!: number;

  createdAt!: Date;

  updatedAt!: Date;
}

export class JobSeekerCvEmailSegmentListReponseDto extends BaseListResponseDto<JobSeekerCvEmailSegmentDto> {}
