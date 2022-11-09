import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateThumbdownCountDto extends BaseDto {
  tickOn!: number;

  candidateId!: string;

  jobId!: string;

  userId!: string;
}

export class CandidateThumbdownCountListReponseDto extends BaseListResponseDto<CandidateThumbdownCountDto> {}
