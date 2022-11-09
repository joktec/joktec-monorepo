import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidatePerferenceHistoryDto extends BaseDto {
  jobId!: string;

  jobName!: string;

  user!: string;

  action!: string;
}

export class CandidatePerferenceHistoryListReponseDto extends BaseListResponseDto<CandidatePerferenceHistoryDto> {}
