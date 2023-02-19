import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerCrawlerInput {
  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => Int, {
    nullable: true,
  })
  source!: number;

  @Field(() => String, {
    nullable: true,
  })
  crawlerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;
}

@InputType()
export class CreateJobSeekerCrawlerInput extends BaseJobSeekerCrawlerInput {}

@InputType()
export class UpdateJobSeekerCrawlerInput extends BaseJobSeekerCrawlerInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerCrawlerPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerCrawlerConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerCrawlerQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerCrawlerConditionInput,
  paginationInput: JobSeekerCrawlerPaginationInput,
})<JobSeekerCrawlerConditionInput, JobSeekerCrawlerPaginationInput> {}
