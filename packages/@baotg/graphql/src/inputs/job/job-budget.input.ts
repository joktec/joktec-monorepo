import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobBudgetInput {
  @Field(() => Number, { nullable: true })
  totalCredits: number;

  @Field(() => Number, { nullable: true })
  remainingCredits: number;

  @Field(() => Number, { nullable: true })
  viewCount: number;

  @Field(() => Number, { nullable: true })
  candidateCount: number;

  @Field(() => Number, { nullable: true })
  active: number;

  @Field(() => Date, { nullable: true })
  expiryDate: Date;

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
export class CreateJobBudgetInput extends BaseJobBudgetInput {}

@InputType()
export class UpdateJobBudgetInput extends BaseJobBudgetInput {
  @Field()
  id!: string;
}

@InputType()
export class JobBudgetPaginationInput extends BasePaginationInput {}

@InputType()
export class JobBudgetConditionInput extends BaseConditionInput {}

@InputType()
export class JobBudgetQueryInput extends BaseQueryInput({
  conditionInput: JobBudgetConditionInput,
  paginationInput: JobBudgetPaginationInput,
})<JobBudgetConditionInput, JobBudgetPaginationInput> {}
