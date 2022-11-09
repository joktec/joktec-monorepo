import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateLinkInput {
  @Field(() => String, {
    nullable: true,
  })
  linkId!: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;
}

@InputType()
export class CreateCandidateLinkInput extends BaseCandidateLinkInput {}

@InputType()
export class UpdateCandidateLinkInput extends BaseCandidateLinkInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateLinkPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateLinkConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateLinkQueryInput extends BaseQueryInput({
  conditionInput: CandidateLinkConditionInput,
  paginationInput: CandidateLinkPaginationInput,
})<CandidateLinkConditionInput, CandidateLinkPaginationInput> {}
