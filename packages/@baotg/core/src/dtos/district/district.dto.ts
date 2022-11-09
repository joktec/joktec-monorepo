import { CityDto } from '../';
import { BaseDto, BaseListResponseDto } from '../base.dto';

export class DistrictDto extends BaseDto {
  readonly code?: string;
  readonly name?: string;
  readonly nameEng?: string;
  readonly lat?: number;
  readonly lon?: number;
  readonly parent?: DistrictDto;
  readonly city?: string | CityDto;

  // * Migration fields
  readonly districtId?: string;
  readonly parentId?: string;
  readonly cityId?: string;
}

export class DistrictListResponseDto extends BaseListResponseDto<DistrictDto> {}
