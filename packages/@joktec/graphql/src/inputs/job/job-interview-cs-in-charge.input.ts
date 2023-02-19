import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobInterviewCsInChargeInput {
  @Field(() => Number, { nullable: true })
  jobinterviewId: number;

  @Field(() => Number, { nullable: true })
  userId: number;
}

@InputType()
export class CreateJobInterviewCsInChargeInput extends BaseJobInterviewCsInChargeInput {}

@InputType()
export class UpdateJobInterviewCsInChargeInput extends BaseJobInterviewCsInChargeInput {
  @Field()
  id!: string;
}

@InputType()
export class JobInterviewCsInChargePaginationInput extends BasePaginationInput {}

@InputType()
export class JobInterviewCsInChargeConditionInput extends BaseConditionInput {}

@InputType()
export class JobInterviewCsInChargeQueryInput extends BaseQueryInput({
  conditionInput: JobInterviewCsInChargeConditionInput,
  paginationInput: JobInterviewCsInChargePaginationInput,
})<JobInterviewCsInChargeConditionInput, JobInterviewCsInChargePaginationInput> {}
