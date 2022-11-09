import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateFeedbackItemDto extends BaseDto {
  level!: number;

  name!: string;

  inputType!: string;

  groupId!: number;

  parentId!: number;
}

export class CandidateFeedbackItemListReponseDto extends BaseListResponseDto<CandidateFeedbackItemDto> {}
