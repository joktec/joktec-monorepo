import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateLinkDto extends BaseDto {
  linkId!: string;

  candidateId!: string;

  createDate!: Date;

  lastUpdate!: Date;

  name!: string;
}

export class CandidateLinkListReponseDto extends BaseListResponseDto<CandidateLinkDto> {}
