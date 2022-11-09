import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateCompanyTypeInput {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  companyTypeId!: string;
}

@InputType()
export class CreateCandidateCompanyTypeInput extends BaseCandidateCompanyTypeInput {}

@InputType()
export class UpdateCandidateCompanyTypeInput extends BaseCandidateCompanyTypeInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateCompanyTypePaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateCompanyTypeConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateCompanyTypeQueryInput extends BaseQueryInput({
  conditionInput: CandidateCompanyTypeConditionInput,
  paginationInput: CandidateCompanyTypePaginationInput,
})<CandidateCompanyTypeConditionInput, CandidateCompanyTypePaginationInput> {}
