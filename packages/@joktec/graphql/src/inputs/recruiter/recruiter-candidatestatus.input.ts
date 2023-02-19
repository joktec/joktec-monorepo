import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterCandidatestatusInput {
  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  created!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated!: Date;

  @Field(() => String, {
    nullable: true,
  })
  notes!: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  acceptInterview!: number;

  @Field(() => String, {
    nullable: true,
  })
  interviewId!: string;
}

@InputType()
export class CreateRecruiterCandidatestatusInput extends BaseRecruiterCandidatestatusInput {}

@InputType()
export class UpdateRecruiterCandidatestatusInput extends BaseRecruiterCandidatestatusInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterCandidatestatusPaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterCandidatestatusConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterCandidatestatusQueryInput extends BaseQueryInput({
  conditionInput: RecruiterCandidatestatusConditionInput,
  paginationInput: RecruiterCandidatestatusPaginationInput,
})<RecruiterCandidatestatusConditionInput, RecruiterCandidatestatusPaginationInput> {}
