import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateLocationInput {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  locationId!: number;
}

@InputType()
export class CreateCandidateLocationInput extends BaseCandidateLocationInput {}

@InputType()
export class UpdateCandidateLocationInput extends BaseCandidateLocationInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateLocationPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateLocationConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateLocationQueryInput extends BaseQueryInput({
  conditionInput: CandidateLocationConditionInput,
  paginationInput: CandidateLocationPaginationInput,
})<CandidateLocationConditionInput, CandidateLocationPaginationInput> {}
