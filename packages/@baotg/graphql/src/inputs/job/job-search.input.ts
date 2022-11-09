import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSearchInput {
  @Field(() => String, { nullable: true })
  keyword: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  params: string;

  @Field(() => String, { nullable: true })
  path: string;
}

@InputType()
export class CreateJobSearchInput extends BaseJobSearchInput {}

@InputType()
export class UpdateJobSearchInput extends BaseJobSearchInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSearchPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSearchConditionInput extends BaseConditionInput {}

@InputType()
export class JobSearchQueryInput extends BaseQueryInput({
  conditionInput: JobSearchConditionInput,
  paginationInput: JobSearchPaginationInput,
})<JobSearchConditionInput, JobSearchPaginationInput> {}
