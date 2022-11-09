import { BaseDto, BaseListResponseDto } from '../base.dto';

export class SettingDto extends BaseDto {
  readonly skey?: string;
  readonly svalue?: string;
}

export class SettingListResponseDto extends BaseListResponseDto<SettingDto> {}
