import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCandidateCountInput {
  @Field(() => Number, {
    nullable: true,
  })
  all!: number;

  @Field(() => Number, {
    nullable: true,
  })
  hired!: number;

  @Field(() => Number, {
    nullable: true,
  })
  interviewing!: number;

  @Field(() => Number, {
    nullable: true,
  })
  new!: number;

  @Field(() => Number, {
    nullable: true,
  })
  offered!: number;

  @Field(() => Number, {
    nullable: true,
  })
  probation!: number;

  @Field(() => Number, {
    nullable: true,
  })
  rejected!: number;

  @Field(() => Number, {
    nullable: true,
  })
  screening!: number;

  @Field(() => Number, {
    nullable: true,
  })
  withdrew!: number;
}

@InputType()
export class CreateCandidateCountInput extends BaseCandidateCountInput {
  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;
}

@InputType()
export class UpdateCandidateCountInput extends BaseCandidateCountInput {
  @Field()
  id!: string;
}

@InputType()
export class CandidateCountPaginationInput extends BasePaginationInput {}

@InputType()
export class CandidateCountConditionInput extends BaseConditionInput {
  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;
}

@InputType()
export class CandidateCountQueryInput extends BaseQueryInput({
  conditionInput: CandidateCountConditionInput,
  paginationInput: CandidateCountPaginationInput,
})<CandidateCountConditionInput, CandidateCountPaginationInput> {}
