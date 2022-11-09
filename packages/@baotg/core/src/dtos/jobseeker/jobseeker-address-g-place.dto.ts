import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerAddressGPlaceDto extends BaseDto {
  country!: string;

  formattedAddress!: string;

  placeId!: string;

  administrativeAreaLevel1!: string;

  createdAt!: Date;

  updatedAt!: Date;

  jobseekerId!: string;

  countryShortCode!: string;
}

export class JobSeekerAddressGPlaceListReponseDto extends BaseListResponseDto<JobSeekerAddressGPlaceDto> {}
