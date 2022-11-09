import { BaseDto, BaseListResponseDto } from '../base.dto';

export class GameUserSessionDto extends BaseDto {
  userId!: string;

  deviceId!: string;
}

export class GameUserSessionListReponseDto extends BaseListResponseDto<GameUserSessionDto> {}
