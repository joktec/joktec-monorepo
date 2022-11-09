import { BaseDto, BaseListResponseDto } from '../base.dto';

export class GameAssessmentTestJobHistoryDto extends BaseDto {
  username!: string;

  applyType!: string;

  status!: string;

  cvId!: string;

  jobId!: string;

  jobseekerId!: string;

  quizId!: string;

  platform!: string;

  referralId!: string;

  testingEmail!: string;
}

export class GameAssessmentTestJobHistoryListReponseDto extends BaseListResponseDto<GameAssessmentTestJobHistoryDto> {}
