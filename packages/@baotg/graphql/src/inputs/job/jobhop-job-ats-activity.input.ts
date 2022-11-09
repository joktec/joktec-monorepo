import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopJobAtsActivityInput {
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  candidateId: string;

  @Field(() => String, { nullable: true })
  doerId: string;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => String, { nullable: true })
  activityType: string;

  @Field(() => String, { nullable: true })
  candidateType: string;

  @Field(() => String, { nullable: true })
  currentStatus: string;

  @Field(() => String, { nullable: true })
  planName: string;

  @Field(() => String, { nullable: true })
  previousStatus: string;

  @Field(() => Number, { nullable: true })
  isPublic: number;
}

@InputType()
export class CreateJobhopJobAtsActivityInput extends BaseJobhopJobAtsActivityInput {}

@InputType()
export class UpdateJobhopJobAtsActivityInput extends BaseJobhopJobAtsActivityInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopJobAtsActivityPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopJobAtsActivityConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopJobAtsActivityQueryInput extends BaseQueryInput({
  conditionInput: JobhopJobAtsActivityConditionInput,
  paginationInput: JobhopJobAtsActivityPaginationInput,
})<JobhopJobAtsActivityConditionInput, JobhopJobAtsActivityPaginationInput> {}
