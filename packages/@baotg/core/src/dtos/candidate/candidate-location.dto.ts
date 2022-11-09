import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateLocationDto extends BaseDto {
  candidateId!: string;

  locationId!: number;
}

export class CandidateLocationListReponseDto extends BaseListResponseDto<CandidateLocationDto> {}
