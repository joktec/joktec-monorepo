import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerMarketValueInput {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isJhProfile!: number;

  @Field(() => Int, {
    nullable: true,
  })
  marketValue!: number;

  @Field(() => Int, {
    nullable: true,
  })
  nearestMarketValue!: number;

  @Field(() => String, {
    nullable: true,
  })
  metaData!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createdBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;
}

@InputType()
export class CreateJobSeekerMarketValueInput extends BaseJobSeekerMarketValueInput {}

@InputType()
export class UpdateJobSeekerMarketValueInput extends BaseJobSeekerMarketValueInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerMarketValuePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerMarketValueConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerMarketValueQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerMarketValueConditionInput,
  paginationInput: JobSeekerMarketValuePaginationInput,
})<JobSeekerMarketValueConditionInput, JobSeekerMarketValuePaginationInput> {}
