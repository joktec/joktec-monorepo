import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateIndustryInput {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;
}

@InputType()
export class CreateCandidateIndustryInput extends BaseCandidateIndustryInput {}

@InputType()
export class UpdateCandidateIndustryInput extends BaseCandidateIndustryInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateIndustryPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateIndustryConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateIndustryQueryInput extends BaseQueryInput({
  conditionInput: CandidateIndustryConditionInput,
  paginationInput: CandidateIndustryPaginationInput,
})<CandidateIndustryConditionInput, CandidateIndustryPaginationInput> {}
