import { BaseDto, BaseListResponseDto } from '../base.dto';

export class QuizzLanguageDto extends BaseDto {
  name!: string;

  logo!: string;
}

export class QuizzLanguageListReponseDto extends BaseListResponseDto<QuizzLanguageDto> {}
