import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobInterviewInput {
  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  updated: Date;

  @Field(() => Number, { nullable: true })
  approved: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  requestedById: string;

  @Field(() => String, { nullable: true })
  attachedContract: string;

  @Field(() => Number, { nullable: true })
  creditsBalance: number;

  @Field(() => Number, { nullable: true })
  creditsPerInterview: number;

  @Field(() => Date, { nullable: true })
  expiryDate: Date;

  @Field(() => Number, { nullable: true })
  salary: number;

  @Field(() => Number, { nullable: true })
  totalChargedCredits: number;

  @Field(() => Number, { nullable: true })
  totalInterviewBudget: number;

  @Field(() => Number, { nullable: true })
  statusId: number;

  @Field(() => Number, { nullable: true })
  active: number;

  @Field(() => Number, { nullable: true })
  creditsPending: number;

  @Field(() => String, { nullable: true })
  consultant: string;
}

@InputType()
export class CreateJobInterviewInput extends BaseJobInterviewInput {}

@InputType()
export class UpdateJobInterviewInput extends BaseJobInterviewInput {
  @Field()
  id!: string;
}

@InputType()
export class JobInterviewPaginationInput extends BasePaginationInput {}

@InputType()
export class JobInterviewConditionInput extends BaseConditionInput {}

@InputType()
export class JobInterviewQueryInput extends BaseQueryInput({
  conditionInput: JobInterviewConditionInput,
  paginationInput: JobInterviewPaginationInput,
})<JobInterviewConditionInput, JobInterviewPaginationInput> {}
