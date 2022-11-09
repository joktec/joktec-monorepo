import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobBudgetSuggestInfoInput {
  @Field(() => String, { nullable: true })
  info: string;

  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Number, { nullable: true })
  creditBalance: number;
}

@InputType()
export class CreateJobBudgetSuggestInfoInput extends BaseJobBudgetSuggestInfoInput {}

@InputType()
export class UpdateJobBudgetSuggestInfoInput extends BaseJobBudgetSuggestInfoInput {
  @Field()
  id!: string;
}

@InputType()
export class JobBudgetSuggestInfoPaginationInput extends BasePaginationInput {}

@InputType()
export class JobBudgetSuggestInfoConditionInput extends BaseConditionInput {}

@InputType()
export class JobBudgetSuggestInfoQueryInput extends BaseQueryInput({
  conditionInput: JobBudgetSuggestInfoConditionInput,
  paginationInput: JobBudgetSuggestInfoPaginationInput,
})<JobBudgetSuggestInfoConditionInput, JobBudgetSuggestInfoPaginationInput> {}
