import { BaseDto, BaseListResponseDto } from '../base.dto';

export class GameTurnLogDto extends BaseDto {
  turn!: number;

  isRead!: number;

  isVisible!: number;

  isClaimed!: number;

  action!: string;

  jobseekerId!: string;

  quizMatchId!: number;

  metaData!: string;
}

export class GameTurnLogListReponseDto extends BaseListResponseDto<GameTurnLogDto> {}
