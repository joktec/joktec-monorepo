import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerCvEmailSegmentInput implements IBaseInput {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  cvId!: string;

  fullName!: string;

  accountActivated!: number;

  createdAt!: Date;

  updatedAt!: Date;
}

export class CreateJobSeekerCvEmailSegmentInput extends BaseJobSeekerCvEmailSegmentInput implements IBaseCreateInput {}

export class UpdateJobSeekerCvEmailSegmentInput extends BaseJobSeekerCvEmailSegmentInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerCvEmailSegmentPaginationInput extends BasePaginationInput {}

export class JobSeekerCvEmailSegmentConditionInput extends BaseConditionInput {}

export class JobSeekerCvEmailSegmentQueryInput extends BaseQueryInput<
  JobSeekerCvEmailSegmentConditionInput,
  JobSeekerCvEmailSegmentPaginationInput
> {}
