import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerReferenceInput implements IBaseInput {
  name!: string;

  title!: string;

  email!: string;

  @IsNotEmpty()
  username!: string;

  phoneNumber!: string;

  companyName!: string;

  updateBy!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;
}

export class CreateJobSeekerReferenceInput extends BaseJobSeekerReferenceInput implements IBaseCreateInput {}

export class UpdateJobSeekerReferenceInput extends BaseJobSeekerReferenceInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerReferencePaginationInput extends BasePaginationInput {}

export class JobSeekerReferenceConditionInput extends BaseConditionInput {}

export class JobSeekerReferenceQueryInput extends BaseQueryInput<
  JobSeekerReferenceConditionInput,
  JobSeekerReferencePaginationInput
> {}
