import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzActionLogDto extends BaseDto {
  action!: string;

  jobseekerId!: string;

  quizId!: number;

  isClaimedCheckin!: number;
}

export class QuizzActionLogListReponseDto extends BaseListResponseDto<QuizzActionLogDto> {}
