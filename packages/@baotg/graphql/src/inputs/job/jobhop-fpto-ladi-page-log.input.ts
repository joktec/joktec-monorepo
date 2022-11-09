import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopFptoLadiPageLogInput {
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  timestamp: string;

  @Field(() => String, { nullable: true })
  companyName: string;

  @Field(() => String, { nullable: true })
  companySize: string;

  @Field(() => String, { nullable: true })
  headCount: string;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  source: string;

  @Field(() => String, { nullable: true })
  fullName: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  suggestedPackage: string;

  @Field(() => Number, { nullable: true })
  success: number;

  @Field(() => String, { nullable: true })
  reason: string;
}

@InputType()
export class CreateJobhopFptoLadiPageLogInput extends BaseJobhopFptoLadiPageLogInput {}

@InputType()
export class UpdateJobhopFptoLadiPageLogInput extends BaseJobhopFptoLadiPageLogInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopFptoLadiPageLogPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopFptoLadiPageLogConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopFptoLadiPageLogQueryInput extends BaseQueryInput({
  conditionInput: JobhopFptoLadiPageLogConditionInput,
  paginationInput: JobhopFptoLadiPageLogPaginationInput,
})<JobhopFptoLadiPageLogConditionInput, JobhopFptoLadiPageLogPaginationInput> {}
