import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobInterviewCategoryInput {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
export class CreateJobInterviewCategoryInput extends BaseJobInterviewCategoryInput {}

@InputType()
export class UpdateJobInterviewCategoryInput extends BaseJobInterviewCategoryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobInterviewCategoryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobInterviewCategoryConditionInput extends BaseConditionInput {}

@InputType()
export class JobInterviewCategoryQueryInput extends BaseQueryInput({
  conditionInput: JobInterviewCategoryConditionInput,
  paginationInput: JobInterviewCategoryPaginationInput,
})<JobInterviewCategoryConditionInput, JobInterviewCategoryPaginationInput> {}
