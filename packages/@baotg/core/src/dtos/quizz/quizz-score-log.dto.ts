import { BaseDto } from '../base.dto';

export class QuizzScoreLogDto extends BaseDto {
  score!: number;

  scoreType!: string;

  jobseekerId!: string;

  quizMatchId!: number;
}
