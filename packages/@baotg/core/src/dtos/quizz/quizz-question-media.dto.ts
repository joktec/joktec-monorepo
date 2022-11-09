import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzQuestionMediaDto extends BaseDto {
  image!: string;

  video!: string;

  mediaType!: string;

  questionId!: number;
}

export class QuizzQuestionMediaListReponseDto extends BaseListResponseDto<QuizzQuestionMediaDto> {}
