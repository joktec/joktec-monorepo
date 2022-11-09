import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzLogQuestionAnswerDto extends BaseDto {
  answers!: string;

  correctAnswers!: string;

  isCorrect!: number;

  score!: number;

  questionId!: number;

  quizMatchId!: number;

  usedHint!: number;

  metaData!: string;
}

export class QuizzLogQuestionAnswerListReponseDto extends BaseListResponseDto<QuizzLogQuestionAnswerDto> {}
