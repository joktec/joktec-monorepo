import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzVoteLogDto extends BaseDto {
  voteStatus!: string;

  jobseekerId!: string;

  quizId!: number;

  reason!: string;
}

export class QuizzVoteLogListReponseDto extends BaseListResponseDto<QuizzVoteLogDto> {}
