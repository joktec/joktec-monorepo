import { BaseDto, BaseListResponseDto } from '../base.dto';

export class DegreeDto extends BaseDto {
  readonly name?: string;
  readonly code?: string;
}

export class DegreeListResponseDto extends BaseListResponseDto<DegreeDto> {}
