import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateAttachInput {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  oldCandidateId!: string;
}

@InputType()
export class CreateCandidateAttachInput extends BaseCandidateAttachInput {}

@InputType()
export class UpdateCandidateAttachInput extends BaseCandidateAttachInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateAttachPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateAttachConditionInput extends BaseConditionInput {}

@InputType()
export class CandidateAttachQueryInput extends BaseQueryInput({
  conditionInput: CandidateAttachConditionInput,
  paginationInput: CandidateAttachPaginationInput,
})<CandidateAttachConditionInput, CandidateAttachPaginationInput> {}
