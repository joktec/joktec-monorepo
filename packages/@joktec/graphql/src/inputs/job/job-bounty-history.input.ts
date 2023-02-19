import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobBountyHistoryInput {
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  action: string;

  @Field(() => String, { nullable: true })
  userEmail: string;

  @Field(() => Number, { nullable: true })
  jobBountyId: number;
}

@InputType()
export class CreateJobBountyHistoryInput extends BaseJobBountyHistoryInput {}

@InputType()
export class UpdateJobBountyHistoryInput extends BaseJobBountyHistoryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobBountyHistoryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobBountyHistoryConditionInput extends BaseConditionInput {}

@InputType()
export class JobBountyHistoryQueryInput extends BaseQueryInput({
  conditionInput: JobBountyHistoryConditionInput,
  paginationInput: JobBountyHistoryPaginationInput,
})<JobBountyHistoryConditionInput, JobBountyHistoryPaginationInput> {}
