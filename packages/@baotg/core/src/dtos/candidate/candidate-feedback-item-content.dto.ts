import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateFeedbackItemContentDto extends BaseDto {
  lang!: string;

  title!: string;

  items!: object;

  candidatefeedbackitemId!: number;
}

export class CandidateFeedbackItemContentListReponseDto extends BaseListResponseDto<CandidateFeedbackItemContentDto> {}
