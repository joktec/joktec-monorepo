import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerFollowedOrganizationDto extends BaseDto {
  following!: number;

  jobseekerId!: string;

  organizationId!: string;

  emailSubscribed!: number;

  numberOfFollowTime!: number;

  createdAt!: Date;

  updatedAt!: Date;
}

export class JobSeekerFollowedOrganizationListReponseDto extends BaseListResponseDto<JobSeekerFollowedOrganizationDto> {}
