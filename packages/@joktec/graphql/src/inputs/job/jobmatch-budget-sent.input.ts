import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobMatchBudgetSentInput {
  @Field(() => Int, {
    nullable: true,
  })
  sent: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId: string;

  @Field(() => Int, {
    nullable: true,
  })
  staffSent: number;
}

@InputType()
export class CreateJobMatchBudgetSentInput extends BaseJobMatchBudgetSentInput {}

@InputType()
export class UpdateJobMatchBudgetSentInput extends BaseJobMatchBudgetSentInput {
  @Field()
  id!: string;
}

@InputType()
export class JobMatchBudgetSentPaginationInput extends BasePaginationInput {}

@InputType()
export class JobMatchBudgetSentConditionInput extends BaseConditionInput {}

@InputType()
export class JobMatchBudgetSentQueryInput extends BaseQueryInput({
  conditionInput: JobMatchBudgetSentConditionInput,
  paginationInput: JobMatchBudgetSentPaginationInput,
})<JobMatchBudgetSentConditionInput, JobMatchBudgetSentPaginationInput> {}
