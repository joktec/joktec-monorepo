import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobBudgetRequestInput {
  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  status: string;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  requestById: string;

  @Field(() => Number, { nullable: true })
  sentReminder: number;
}

@InputType()
export class CreateJobBudgetRequestInput extends BaseJobBudgetRequestInput {}

@InputType()
export class UpdateJobBudgetRequestInput extends BaseJobBudgetRequestInput {
  @Field()
  id!: string;
}

@InputType()
export class JobBudgetRequestPaginationInput extends BasePaginationInput {}

@InputType()
export class JobBudgetRequestConditionInput extends BaseConditionInput {}

@InputType()
export class JobBudgetRequestQueryInput extends BaseQueryInput({
  conditionInput: JobBudgetRequestConditionInput,
  paginationInput: JobBudgetRequestPaginationInput,
})<JobBudgetRequestConditionInput, JobBudgetRequestPaginationInput> {}
