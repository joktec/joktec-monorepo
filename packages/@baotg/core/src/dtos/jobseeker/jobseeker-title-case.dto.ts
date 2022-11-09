import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerTitleCaseDto extends BaseDto {
  title!: string;
}

export class JobSeekerTitleCaseListReponseDto extends BaseListResponseDto<JobSeekerTitleCaseDto> {}
