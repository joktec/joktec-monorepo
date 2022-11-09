import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobThumdownReasonInput {
  @Field(() => String, { nullable: true })
  otherReason: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  jobseekerId: string;

  @Field(() => Number, { nullable: true })
  thumbdownReasonsId: number;
}

@InputType()
export class CreateJobThumdownReasonInput extends BaseJobThumdownReasonInput {}

@InputType()
export class UpdateJobThumdownReasonInput extends BaseJobThumdownReasonInput {
  @Field()
  id!: string;
}

@InputType()
export class JobThumdownReasonPaginationInput extends BasePaginationInput {}

@InputType()
export class JobThumdownReasonConditionInput extends BaseConditionInput {}

@InputType()
export class JobThumdownReasonQueryInput extends BaseQueryInput({
  conditionInput: JobThumdownReasonConditionInput,
  paginationInput: JobThumdownReasonPaginationInput,
})<JobThumdownReasonConditionInput, JobThumdownReasonPaginationInput> {}
