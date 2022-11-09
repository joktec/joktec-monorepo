import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobLikeInput {
  @Field(() => Number, { nullable: true })
  like: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Date, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  username: string;
}

@InputType()
export class CreateJobLikeInput extends BaseJobLikeInput {}

@InputType()
export class UpdateJobLikeInput extends BaseJobLikeInput {
  @Field()
  id!: string;
}

@InputType()
export class JobLikePaginationInput extends BasePaginationInput {}

@InputType()
export class JobLikeConditionInput extends BaseConditionInput {}

@InputType()
export class JobLikeQueryInput extends BaseQueryInput({
  conditionInput: JobLikeConditionInput,
  paginationInput: JobLikePaginationInput,
})<JobLikeConditionInput, JobLikePaginationInput> {}
