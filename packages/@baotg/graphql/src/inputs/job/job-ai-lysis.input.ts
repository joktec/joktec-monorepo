import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobAiLysisInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Number, { nullable: true })
  credits: number;

  @Field(() => Date, { nullable: true })
  expiryDate: Date;

  @Field(() => Number, { nullable: true })
  isVerified: number;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => Number, { nullable: true })
  remainingCredits: number;

  @Field(() => String, { nullable: true })
  sapCompanyId: string;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  updatedBy: string;
}

@InputType()
export class CreateJobAiLysisInput extends BaseJobAiLysisInput {}

@InputType()
export class UpdateJobAiLysisInput extends BaseJobAiLysisInput {
  @Field()
  id!: string;
}

@InputType()
export class JobAiLysisPaginationInput extends BasePaginationInput {}

@InputType()
export class JobAiLysisConditionInput extends BaseConditionInput {}

@InputType()
export class JobAiLysisQueryInput extends BaseQueryInput({
  conditionInput: JobAiLysisConditionInput,
  paginationInput: JobAiLysisPaginationInput,
})<JobAiLysisConditionInput, JobAiLysisPaginationInput> {}
