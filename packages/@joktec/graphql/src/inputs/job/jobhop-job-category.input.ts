import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopJobCategoryInput {
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => Number, { nullable: true })
  functionId: number;

  @Field(() => String, { nullable: true })
  jobId: string;
}

@InputType()
export class CreateJobhopJobCategoryInput extends BaseJobhopJobCategoryInput {}

@InputType()
export class UpdateJobhopJobCategoryInput extends BaseJobhopJobCategoryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopJobCategoryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopJobCategoryConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopJobCategoryQueryInput extends BaseQueryInput({
  conditionInput: JobhopJobCategoryConditionInput,
  paginationInput: JobhopJobCategoryPaginationInput,
})<JobhopJobCategoryConditionInput, JobhopJobCategoryPaginationInput> {}
