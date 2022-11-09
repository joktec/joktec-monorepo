import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzQuestionAnswerDto extends BaseDto {
  answer!: string;

  answerVi!: string;

  isCorrectAnswer!: number;

  questionId!: number;
}

export class QuizzQuestionAnswerListReponseDto extends BaseListResponseDto<QuizzQuestionAnswerDto> {}
