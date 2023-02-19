import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateThumbdownCountInput {
  @Field(() => Int, {
    nullable: true,
  })
  tickOn!: number;

  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  userId!: string;
}

@InputType()
export class CreateCandidateThumbdownCountInput extends BaseCandidateThumbdownCountInput {}

@InputType()
export class UpdateCandidateThumbdownCountInput extends BaseCandidateThumbdownCountInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateThumbdownCountPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateThumbdownCountConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateThumbdownCountQueryInput extends BaseQueryInput({
  conditionInput: CandidateThumbdownCountConditionInput,
  paginationInput: CandidateThumbdownCountPaginationInput,
})<CandidateThumbdownCountConditionInput, CandidateThumbdownCountPaginationInput> {}
