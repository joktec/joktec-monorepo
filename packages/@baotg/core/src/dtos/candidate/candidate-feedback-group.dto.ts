import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateFeedbackGroupDto extends BaseDto {
  name!: string;
}

export class CandidateFeedbackGroupListReponseDto extends BaseListResponseDto<CandidateFeedbackGroupDto> {}
