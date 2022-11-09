import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzQuestionDto extends BaseDto {
  question!: string;

  questionVi!: string;

  hint!: string;

  hintVi!: string;

  explanation!: string;

  explanationVi!: string;

  score!: number;

  isMultiAnswer!: number;

  quizId!: number;

  isFreetext!: string;

  cloneFromId!: string;

  description!: string;
}

export class QuizzQuestionListReponseDto extends BaseListResponseDto<QuizzQuestionDto> {}
