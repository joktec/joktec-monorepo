import { BaseDto, BaseListResponseDto } from '../base.dto';

export class GameScoreTurnLogDto extends BaseDto {
  remainingTurn!: number;

  totalScore!: number;

  jobseekerId!: string;

  userId!: string;
}

export class GameScoreTurnLogListReponseDto extends BaseListResponseDto<GameScoreTurnLogDto> {}
