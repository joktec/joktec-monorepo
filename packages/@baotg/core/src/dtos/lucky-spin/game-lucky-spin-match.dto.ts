import { BaseDto, BaseListResponseDto } from '../base.dto';

export class GameLuckySpinMatchDto extends BaseDto {
  jobseekerId!: string;

  luckySpinId!: number;
}

export class GameLuckySpinMatchListReponseDto extends BaseListResponseDto<GameLuckySpinMatchDto> {}
