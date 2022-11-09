import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerJobExpectedInput implements IBaseInput {
  title!: string;

  @IsNotEmpty()
  jobseekerId!: string;

  createdAt!: Date;

  aiStatusCode!: number;

  aiUpdatedAt!: string;

  skillsVectorEmbedding!: string;

  vectorEmbedding!: string;

  updatedAt!: Date;
}

export class CreateJobSeekerJobExpectedInput extends BaseJobSeekerJobExpectedInput implements IBaseCreateInput {}

export class UpdateJobSeekerJobExpectedInput extends BaseJobSeekerJobExpectedInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerJobExpectedPaginationInput extends BasePaginationInput {}

export class JobSeekerJobExpectedConditionInput extends BaseConditionInput {}

export class JobSeekerJobExpectedQueryInput extends BaseQueryInput<
  JobSeekerJobExpectedConditionInput,
  JobSeekerJobExpectedPaginationInput
> {}
