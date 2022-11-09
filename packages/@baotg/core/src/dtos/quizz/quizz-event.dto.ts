import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzEventDto extends BaseDto {
  name!: string;

  showBannerFrom!: Date;

  showBannerTo!: Date;

  startAt!: Date;

  endAt!: Date;

  banner!: string;

  quizId!: number;

  leaderBoardResult!: string;

  eventType!: string;

  eventLink!: string;

  endEventLink!: string;
}

export class QuizzEventListReponseDto extends BaseListResponseDto<QuizzEventDto> {}
