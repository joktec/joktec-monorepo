import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateFunctionDto extends BaseDto {
  candidateId!: string;

  functionId!: number;
}

export class CandidateFunctionListReponseDto extends BaseListResponseDto<CandidateFunctionDto> {}
