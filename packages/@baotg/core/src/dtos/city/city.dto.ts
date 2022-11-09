import { BaseDto, BaseListResponseDto } from '../base.dto';
import { CountryDto } from '../';

export class CityDto extends BaseDto {
  readonly name?: string;
  readonly nameEng?: string;
  readonly code?: string;
  readonly country?: string | CountryDto;
  readonly priority?: number;
  readonly prioritySearch?: number;
  readonly enabled?: number;
  readonly image?: string;
  readonly imageHighlight?: string;

  // * Migration fields
  readonly cityId?: string;
  readonly countryId?: string;
}

export class CityListResponseDto extends BaseListResponseDto<CityDto> {}
