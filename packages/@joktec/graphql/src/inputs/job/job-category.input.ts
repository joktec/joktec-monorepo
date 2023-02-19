import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobCategoryInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  nameEng: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => Number, { nullable: true })
  priority: number;

  @Field(() => String, { nullable: true })
  code: string;

  @Field(() => Number, { nullable: true })
  active: number;
}

@InputType()
export class CreateJobCategoryInput extends BaseJobCategoryInput {}

@InputType()
export class UpdateJobCategoryInput extends BaseJobCategoryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobCategoryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobCategoryConditionInput extends BaseConditionInput {}

@InputType()
export class JobCategoryQueryInput extends BaseQueryInput({
  conditionInput: JobCategoryConditionInput,
  paginationInput: JobCategoryPaginationInput,
})<JobCategoryConditionInput, JobCategoryPaginationInput> {}
