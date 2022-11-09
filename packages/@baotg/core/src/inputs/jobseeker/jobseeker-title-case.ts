import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerTitleCaseInput implements IBaseInput {
  @IsNotEmpty()
  title!: string;
}

export class CreateJobSeekerTitleCaseInput extends BaseJobSeekerTitleCaseInput implements IBaseCreateInput {}

export class UpdateJobSeekerTitleCaseInput extends BaseJobSeekerTitleCaseInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerTitleCasePaginationInput extends BasePaginationInput {}

export class JobSeekerTitleCaseConditionInput extends BaseConditionInput {}

export class JobSeekerTitleCaseQueryInput extends BaseQueryInput<
  JobSeekerTitleCaseConditionInput,
  JobSeekerTitleCasePaginationInput
> {}
