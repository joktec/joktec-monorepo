import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerVerifyAccountFileDto extends BaseDto {
  jobseekerId!: string;

  file!: string;

  fileSize!: number;

  fileName!: string;

  createdAt!: Date;

  contentType!: string;

  verifyAccountId!: number;

  fileKey!: string;
}

export class JobSeekerVerifyAccountFileListReponseDto extends BaseListResponseDto<JobSeekerVerifyAccountFileDto> {}
