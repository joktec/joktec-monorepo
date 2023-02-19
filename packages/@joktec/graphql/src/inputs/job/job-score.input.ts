import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobScoreInput {
  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Number, { nullable: true })
  score: number;
}

@InputType()
export class CreateJobScoreInput extends BaseJobScoreInput {}

@InputType()
export class UpdateJobScoreInput extends BaseJobScoreInput {
  @Field()
  id!: string;
}

@InputType()
export class JobScorePaginationInput extends BasePaginationInput {}

@InputType()
export class JobScoreConditionInput extends BaseConditionInput {}

@InputType()
export class JobScoreQueryInput extends BaseQueryInput({
  conditionInput: JobScoreConditionInput,
  paginationInput: JobScorePaginationInput,
})<JobScoreConditionInput, JobScorePaginationInput> {}
