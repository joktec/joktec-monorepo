import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CountryDto extends BaseDto {
  readonly name?: string;
  readonly nameEng?: string;
  readonly code?: string;

  readonly countryId?: string;
}

export class CountryListResponseDto extends BaseListResponseDto<CountryDto> {}
