import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuestionCategoryDto extends BaseDto {
  categoryId!: string;

  codeName!: string;

  name!: string;

  description!: string;

  imageActiveMode!: string;

  imageDisableMode!: string;

  priority!: number;
}

export class QuestionCategoryListReponseDto extends BaseListResponseDto<QuestionCategoryDto> {}
