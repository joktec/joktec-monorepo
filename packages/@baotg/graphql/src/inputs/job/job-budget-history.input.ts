import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobBudgetHistoryInput {
  @Field(() => Number, { nullable: true })
  description: number;

  @Field(() => Number, { nullable: true })
  balance: number;

  @Field(() => Number, { nullable: true })
  prevBalance: number;

  @Field(() => Number, { nullable: true })
  credits: number;

  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Number, { nullable: true })
  platform: number;
}

@InputType()
export class CreateJobBudgetHistoryInput extends BaseJobBudgetHistoryInput {}

@InputType()
export class UpdateJobBudgetHistoryInput extends BaseJobBudgetHistoryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobBudgetHistoryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobBudgetHistoryConditionInput extends BaseConditionInput {}

@InputType()
export class JobBudgetHistoryQueryInput extends BaseQueryInput({
  conditionInput: JobBudgetHistoryConditionInput,
  paginationInput: JobBudgetHistoryPaginationInput,
})<JobBudgetHistoryConditionInput, JobBudgetHistoryPaginationInput> {}
