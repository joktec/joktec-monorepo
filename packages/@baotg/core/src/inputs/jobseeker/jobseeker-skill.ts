import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerSkillInput implements IBaseInput {
  level!: string;

  skill!: string;

  @IsNotEmpty()
  username!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  updateBy!: string;
}

export class CreateJobSeekerSkillInput extends BaseJobSeekerSkillInput implements IBaseCreateInput {}

export class UpdateJobSeekerSkillInput extends BaseJobSeekerSkillInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerSkillPaginationInput extends BasePaginationInput {}

export class JobSeekerSkillConditionInput extends BaseConditionInput {}

export class JobSeekerSkillQueryInput extends BaseQueryInput<
  JobSeekerSkillConditionInput,
  JobSeekerSkillPaginationInput
> {}
