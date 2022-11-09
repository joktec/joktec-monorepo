import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerCrawlerInput implements IBaseInput {
  email!: string;

  source!: number;

  @IsNotEmpty()
  crawlerId!: string;

  createBy!: string;

  createDate!: Date;

  lastUpdate!: Date;

  phoneNumber!: string;

  updateBy!: string;
}

export class CreateJobSeekerCrawlerInput extends BaseJobSeekerCrawlerInput implements IBaseCreateInput {}

export class UpdateJobSeekerCrawlerInput extends BaseJobSeekerCrawlerInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerCrawlerPaginationInput extends BasePaginationInput {}

export class JobSeekerCrawlerConditionInput extends BaseConditionInput {}

export class JobSeekerCrawlerQueryInput extends BaseQueryInput<
  JobSeekerCrawlerConditionInput,
  JobSeekerCrawlerPaginationInput
> {}
