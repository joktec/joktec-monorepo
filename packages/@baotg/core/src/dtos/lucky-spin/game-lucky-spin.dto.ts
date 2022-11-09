import { BaseDto, BaseListResponseDto } from '../base.dto';

export class GameLuckySpinDto extends BaseDto {
  name!: string;

  showBannerFrom!: Date;

  showBannerTo!: Date;

  startAt!: Date;

  endAt!: Date;

  addAdditionalTurn!: number;

  amountOfPieces!: number;

  maximumTurnPerUser!: number;

  runOfTurnMessage!: string;

  whitelistToWin!: string;
}

export class GameLuckySpinListReponseDto extends BaseListResponseDto<GameLuckySpinDto> {}
