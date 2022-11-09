import { BaseDto, BaseListResponseDto } from '../base.dto';

export class PlatformDto extends BaseDto {
  readonly name?: string;
  readonly code?: string;
}

export class PlatformListResponseDto extends BaseListResponseDto<PlatformDto> {}
