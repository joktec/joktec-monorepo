import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerLanguageInput implements IBaseInput {
  @IsNotEmpty()
  language!: string;

  level!: string;

  @IsNotEmpty()
  username!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  updateBy!: string;
}

export class CreateJobSeekerLanguageInput extends BaseJobSeekerLanguageInput implements IBaseCreateInput {}

export class UpdateJobSeekerLanguageInput extends BaseJobSeekerLanguageInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerLanguagePaginationInput extends BasePaginationInput {}

export class JobSeekerLanguageConditionInput extends BaseConditionInput {}

export class JobSeekerLanguageQueryInput extends BaseQueryInput<
  JobSeekerLanguageConditionInput,
  JobSeekerLanguagePaginationInput
> {}
