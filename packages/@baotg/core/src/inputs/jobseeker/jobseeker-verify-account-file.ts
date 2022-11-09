import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerVerifyAccountFileInput implements IBaseInput {
  @IsNotEmpty()
  jobseekerId!: string;

  file!: string;

  fileSize!: number;

  fileName!: string;

  createdAt!: Date;

  contentType!: string;

  verifyAccountId!: number;

  fileKey!: string;
}

export class CreateJobSeekerVerifyAccountFileInput
  extends BaseJobSeekerVerifyAccountFileInput
  implements IBaseCreateInput {}

export class UpdateJobSeekerVerifyAccountFileInput
  extends BaseJobSeekerVerifyAccountFileInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerVerifyAccountFilePaginationInput extends BasePaginationInput {}

export class JobSeekerVerifyAccountFileConditionInput extends BaseConditionInput {}

export class JobSeekerVerifyAccountFileQueryInput extends BaseQueryInput<
  JobSeekerVerifyAccountFileConditionInput,
  JobSeekerVerifyAccountFilePaginationInput
> {}
