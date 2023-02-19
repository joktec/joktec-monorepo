import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopJobLocationInput {
  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Number, { nullable: true })
  locationId: number;
}

@InputType()
export class CreateJobhopJobLocationInput extends BaseJobhopJobLocationInput {}

@InputType()
export class UpdateJobhopJobLocationInput extends BaseJobhopJobLocationInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopJobLocationPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopJobLocationConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopJobLocationQueryInput extends BaseQueryInput({
  conditionInput: JobhopJobLocationConditionInput,
  paginationInput: JobhopJobLocationPaginationInput,
})<JobhopJobLocationConditionInput, JobhopJobLocationPaginationInput> {}
