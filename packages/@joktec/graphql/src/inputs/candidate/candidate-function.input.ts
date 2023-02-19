import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateFunctionInput {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  functionId!: string;
}

@InputType()
export class CreateCandidateFunctionInput extends BaseCandidateFunctionInput {}

@InputType()
export class UpdateCandidateFunctionInput extends BaseCandidateFunctionInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateFunctionPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateFunctionConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateFunctionQueryInput extends BaseQueryInput({
  conditionInput: CandidateFunctionConditionInput,
  paginationInput: CandidateFunctionPaginationInput,
})<CandidateFunctionConditionInput, CandidateFunctionPaginationInput> {}
