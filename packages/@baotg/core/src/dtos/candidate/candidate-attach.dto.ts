import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateAttachDto extends BaseDto {
  candidateId!: string;

  contentType!: string;

  fileSize!: number;

  lastUpdate!: Date;

  link!: string;

  name!: string;

  deleted!: number;

  oldCandidateId!: string;
}

export class CandidateAttachListReponseDto extends BaseListResponseDto<CandidateAttachDto> {}
