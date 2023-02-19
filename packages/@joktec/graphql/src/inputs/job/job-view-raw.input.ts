import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobViewRawInput {
  @Field(() => Number, { nullable: true })
  viewId: number;

  @Field(() => Date, { nullable: true })
  createDate: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  userId: string;
}

@InputType()
export class CreateJobViewRawInput extends BaseJobViewRawInput {}

@InputType()
export class UpdateJobViewRawInput extends BaseJobViewRawInput {
  @Field()
  id!: string;
}

@InputType()
export class JobViewRawPaginationInput extends BasePaginationInput {}

@InputType()
export class JobViewRawConditionInput extends BaseConditionInput {}

@InputType()
export class JobViewRawQueryInput extends BaseQueryInput({
  conditionInput: JobViewRawConditionInput,
  paginationInput: JobViewRawPaginationInput,
})<JobViewRawConditionInput, JobViewRawPaginationInput> {}
