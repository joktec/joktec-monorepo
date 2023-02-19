import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidatePerferenceHistoryInput {
  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobName!: string;

  @Field(() => String, {
    nullable: true,
  })
  user!: string;

  @Field(() => String, {
    nullable: true,
  })
  action!: string;
}

@InputType()
export class CreateCandidatePerferenceHistoryInput extends BaseCandidatePerferenceHistoryInput {}

@InputType()
export class UpdateCandidatePerferenceHistoryInput extends BaseCandidatePerferenceHistoryInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidatePerferenceHistoryPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidatePerferenceHistoryConditionInput extends BaseConditionInput {}

@InputType()
export class CandidatePerferenceHistoryQueryInput extends BaseQueryInput({
  conditionInput: CandidatePerferenceHistoryConditionInput,
  paginationInput: CandidatePerferenceHistoryPaginationInput,
})<CandidatePerferenceHistoryConditionInput, CandidatePerferenceHistoryPaginationInput> {}
