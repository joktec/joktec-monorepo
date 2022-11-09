import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateCompanyTypeDto extends BaseDto {
  candidateId!: string;

  companyTypeId!: number;
}

export class CandidateCompanyTypeListReponseDto extends BaseListResponseDto<CandidateCompanyTypeDto> {}
