import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateIndustryDto extends BaseDto {
  candidateId!: string;

  industryId!: string;
}

export class CandidateIndustryListReponseDto extends BaseListResponseDto<CandidateIndustryDto> {}
