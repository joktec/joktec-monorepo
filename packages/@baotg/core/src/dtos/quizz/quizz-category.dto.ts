import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzCategoryDto extends BaseDto {
  name!: string;

  nameVi!: string;
}

export class QuizzCategoryListReponseDto extends BaseListResponseDto<QuizzCategoryDto> {}
