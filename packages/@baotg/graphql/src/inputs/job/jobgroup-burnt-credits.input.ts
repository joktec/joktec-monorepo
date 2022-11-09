import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobGroupBurntCreditsInput {
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  cvId: string;

  @Field(() => String, { nullable: true })
  email: string;
}

@InputType()
export class CreateJobGroupBurntCreditsInput extends BaseJobGroupBurntCreditsInput {}

@InputType()
export class UpdateJobGroupBurntCreditsInput extends BaseJobGroupBurntCreditsInput {
  @Field()
  id!: string;
}

@InputType()
export class JobGroupBurntCreditsPaginationInput extends BasePaginationInput {}

@InputType()
export class JobGroupBurntCreditsConditionInput extends BaseConditionInput {}

@InputType()
export class JobGroupBurntCreditsQueryInput extends BaseQueryInput({
  conditionInput: JobGroupBurntCreditsConditionInput,
  paginationInput: JobGroupBurntCreditsPaginationInput,
})<JobGroupBurntCreditsConditionInput, JobGroupBurntCreditsPaginationInput> {}
