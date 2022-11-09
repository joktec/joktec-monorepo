import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerViewProfileDto extends BaseDto {
  viewerId!: string;

  viewerUsername!: string;

  profileId!: string;

  profileUsername!: string;

  createdAt!: Date;

  viewAt!: Date;
}

export class JobSeekerViewProfileListReponseDto extends BaseListResponseDto<JobSeekerViewProfileDto> {}
