import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopEmailHistoryInput {
  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  interviewerEmail: string;

  @Field(() => String, { nullable: true })
  candidateEmail: string;

  @Field(() => String, { nullable: true })
  subject: string;
}

@InputType()
export class CreateJobhopEmailHistoryInput extends BaseJobhopEmailHistoryInput {}

@InputType()
export class UpdateJobhopEmailHistoryInput extends BaseJobhopEmailHistoryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopEmailHistoryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopEmailHistoryConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopEmailHistoryQueryInput extends BaseQueryInput({
  conditionInput: JobhopEmailHistoryConditionInput,
  paginationInput: JobhopEmailHistoryPaginationInput,
})<JobhopEmailHistoryConditionInput, JobhopEmailHistoryPaginationInput> {}
