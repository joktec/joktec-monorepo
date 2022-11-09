import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzMatchLogDto extends BaseDto {
  score!: number;

  status!: string;

  finishedPercent!: number;

  finishedAt!: Date;

  jobseekerId!: string;

  quizId!: number;

  isTimeOut!: number;

  questionOrder!: string;

  replayMatchId!: string;
}

export class QuizzMatchLogListReponseDto extends BaseListResponseDto<QuizzMatchLogDto> {}
