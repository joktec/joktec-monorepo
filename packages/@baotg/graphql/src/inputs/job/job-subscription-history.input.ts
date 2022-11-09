import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSubscriptionHistoryInput {
  @Field(() => String, { nullable: true })
  jobName: string;

  @Field(() => String, { nullable: true })
  prevJobType: string;

  @Field(() => String, { nullable: true })
  curJobType: string;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  userEmail: string;

  @Field(() => String, { nullable: true })
  jobIdId: string;
}

@InputType()
export class CreateJobSubscriptionHistoryInput extends BaseJobSubscriptionHistoryInput {}

@InputType()
export class UpdateJobSubscriptionHistoryInput extends BaseJobSubscriptionHistoryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSubscriptionHistoryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSubscriptionHistoryConditionInput extends BaseConditionInput {}

@InputType()
export class JobSubscriptionHistoryQueryInput extends BaseQueryInput({
  conditionInput: JobSubscriptionHistoryConditionInput,
  paginationInput: JobSubscriptionHistoryPaginationInput,
})<JobSubscriptionHistoryConditionInput, JobSubscriptionHistoryPaginationInput> {}
