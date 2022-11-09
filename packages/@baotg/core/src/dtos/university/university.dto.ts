import { BaseDto, BaseListResponseDto } from '../base.dto';

export class UniversityDto extends BaseDto {
  readonly name?: string;
  readonly nameEng?: string;
}

export class UniversityListResponseDto extends BaseListResponseDto<UniversityDto> {}
