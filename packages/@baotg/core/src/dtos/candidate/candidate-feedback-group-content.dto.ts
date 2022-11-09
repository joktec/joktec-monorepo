import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateFeedbackGroupContentDto extends BaseDto {
  lang!: string;

  title!: string;

  items!: object;

  candidatefeedbackgroupId!: number;
}

export class CandidateFeedbackGroupContentListReponseDto extends BaseListResponseDto<CandidateFeedbackGroupContentDto> {}
