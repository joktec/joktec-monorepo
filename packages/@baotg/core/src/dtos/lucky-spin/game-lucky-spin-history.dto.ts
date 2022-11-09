import { BaseDto, BaseListResponseDto } from '../base.dto';

export class GameLuckySpinHistoryDto extends BaseDto {
  amount!: number;

  itemMetaData!: string;

  luckySpinItemId!: number;

  luckySpinMatchId!: number;
}

export class GameLuckySpinHistoryListReponseDto extends BaseListResponseDto<GameLuckySpinHistoryDto> {}
