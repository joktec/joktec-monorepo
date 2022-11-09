import { BaseDto, BaseListResponseDto } from '../base.dto';

export class SourceDto extends BaseDto {
  code!: string;

  name!: string;
}

export class SourceListResponseDto extends BaseListResponseDto<SourceDto> {}
