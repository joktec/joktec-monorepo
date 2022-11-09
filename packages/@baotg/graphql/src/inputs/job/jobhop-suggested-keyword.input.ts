import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopSuggestedKeywordInput {
  @Field(() => String, {
    nullable: true,
  })
  keyword: string;

  @Field(() => Int, {
    nullable: true,
  })
  score: number;

  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  update: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobId: string;
}

@InputType()
export class CreateJobhopSuggestedKeywordInput extends BaseJobhopSuggestedKeywordInput {}

@InputType()
export class UpdateJobhopSuggestedKeywordInput extends BaseJobhopSuggestedKeywordInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopSuggestedKeywordPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopSuggestedKeywordConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopSuggestedKeywordQueryInput extends BaseQueryInput({
  conditionInput: JobhopSuggestedKeywordConditionInput,
  paginationInput: JobhopSuggestedKeywordPaginationInput,
})<JobhopSuggestedKeywordConditionInput, JobhopSuggestedKeywordPaginationInput> {}
