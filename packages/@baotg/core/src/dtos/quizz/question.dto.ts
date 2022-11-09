import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuestionDto extends BaseDto {
  questionId!: string;

  codeName!: string;

  name!: string;

  description!: string;

  iconUrl!: string;

  categoryId!: number;

  priority!: number;

  isShowInsight!: number;

  descriptionInsight!: string;
}

export class QuestionListReponseDto extends BaseListResponseDto<QuestionDto> {}
