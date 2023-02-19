import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobViewInput {
  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Date, { nullable: true })
  createDate: Date;

  @Field(() => Number, { nullable: true })
  numViews: number;

  @Field(() => Date, { nullable: true })
  timeViews: Date;
}

@InputType()
export class CreateJobViewInput extends BaseJobViewInput {}

@InputType()
export class UpdateJobViewInput extends BaseJobViewInput {
  @Field()
  id!: string;
}

@InputType()
export class JobViewPaginationInput extends BasePaginationInput {}

@InputType()
export class JobViewConditionInput extends BaseConditionInput {}

@InputType()
export class JobViewQueryInput extends BaseQueryInput({
  conditionInput: JobViewConditionInput,
  paginationInput: JobViewPaginationInput,
})<JobViewConditionInput, JobViewPaginationInput> {}
