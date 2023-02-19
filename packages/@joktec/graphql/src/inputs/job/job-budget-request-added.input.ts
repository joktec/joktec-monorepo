import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobBudgetRequestAddedInput {
  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  updated: Date;

  @Field(() => Number, { nullable: true })
  updatedBudget: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  paidById: string;

  @Field(() => Number, { nullable: true })
  sentReminder: number;
}

@InputType()
export class CreateJobBudgetRequestAddedInput extends BaseJobBudgetRequestAddedInput {}

@InputType()
export class UpdateJobBudgetRequestAddedInput extends BaseJobBudgetRequestAddedInput {
  @Field()
  id!: string;
}

@InputType()
export class JobBudgetRequestAddedPaginationInput extends BasePaginationInput {}

@InputType()
export class JobBudgetRequestAddedConditionInput extends BaseConditionInput {}

@InputType()
export class JobBudgetRequestAddedQueryInput extends BaseQueryInput({
  conditionInput: JobBudgetRequestAddedConditionInput,
  paginationInput: JobBudgetRequestAddedPaginationInput,
})<JobBudgetRequestAddedConditionInput, JobBudgetRequestAddedPaginationInput> {}
