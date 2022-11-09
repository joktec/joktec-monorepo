import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobBudgetLogInput {
  @Field(() => Number, { nullable: true })
  credits: number;

  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  createdById: string;

  @Field(() => Number, { nullable: true })
  eventType: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  updatedById: string;

  @Field(() => Number, { nullable: true })
  isThumbedUp: number;

  @Field(() => String, { nullable: true })
  candidateId: string;

  @Field(() => Number, { nullable: true })
  remainingCredits: number;

  @Field(() => String, { nullable: true })
  staffUser: string;

  @Field(() => Number, { nullable: true })
  prevBalance: number;

  @Field(() => Number, { nullable: true })
  platform: number;

  @Field(() => String, { nullable: true })
  note: string;

  @Field(() => Number, { nullable: true })
  orgRemainingCredits: number;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => Number, { nullable: true })
  orgTotalCredits: number;

  @Field(() => Number, { nullable: true })
  isNegative: number;

  @Field(() => Number, { nullable: true })
  totalInterviewBudget: number;

  @Field(() => Number, { nullable: true })
  type: number;
}

@InputType()
export class CreateJobBudgetLogInput extends BaseJobBudgetLogInput {}

@InputType()
export class UpdateJobBudgetLogInput extends BaseJobBudgetLogInput {
  @Field()
  id!: string;
}

@InputType()
export class JobBudgetLogPaginationInput extends BasePaginationInput {}

@InputType()
export class JobBudgetLogConditionInput extends BaseConditionInput {}

@InputType()
export class JobBudgetLogQueryInput extends BaseQueryInput({
  conditionInput: JobBudgetLogConditionInput,
  paginationInput: JobBudgetLogPaginationInput,
})<JobBudgetLogConditionInput, JobBudgetLogPaginationInput> {}
