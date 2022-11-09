import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerCareerInterestCardDto extends BaseDto {
  username!: string;

  jobseekerId!: string;

  jobTitle!: string;

  locationId!: string;

  createdAt!: Date;

  updatedAt!: Date;

  isDeleted!: number;

  jobExpectId!: string;
}

export class JobSeekerCareerInterestCardListReponseDto extends BaseListResponseDto<JobSeekerCareerInterestCardDto> {}
