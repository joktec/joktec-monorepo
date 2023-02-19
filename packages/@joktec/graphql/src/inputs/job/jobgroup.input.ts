import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobGroupInput {
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  organizationId: string;
}

@InputType()
export class CreateJobGroupInput extends BaseJobGroupInput {}

@InputType()
export class UpdateJobGroupInput extends BaseJobGroupInput {
  @Field()
  id!: string;
}

@InputType()
export class JobGroupPaginationInput extends BasePaginationInput {}

@InputType()
export class JobGroupConditionInput extends BaseConditionInput {}

@InputType()
export class JobGroupQueryInput extends BaseQueryInput({
  conditionInput: JobGroupConditionInput,
  paginationInput: JobGroupPaginationInput,
})<JobGroupConditionInput, JobGroupPaginationInput> {}
