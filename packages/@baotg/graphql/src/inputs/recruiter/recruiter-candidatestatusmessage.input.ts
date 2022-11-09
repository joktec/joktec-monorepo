import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterCandidatestatusmessageInput {
  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  vi!: string;

  @Field(() => String, {
    nullable: true,
  })
  en!: string;

  @Field(() => String, {
    nullable: true,
  })
  titleEn!: string;

  @Field(() => String, {
    nullable: true,
  })
  titleVi!: string;
}

@InputType()
export class CreateRecruiterCandidatestatusmessageInput extends BaseRecruiterCandidatestatusmessageInput {}

@InputType()
export class UpdateRecruiterCandidatestatusmessageInput extends BaseRecruiterCandidatestatusmessageInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterCandidatestatusmessagePaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterCandidatestatusmessageConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterCandidatestatusmessageQueryInput extends BaseQueryInput({
  conditionInput: RecruiterCandidatestatusmessageConditionInput,
  paginationInput: RecruiterCandidatestatusmessagePaginationInput,
})<RecruiterCandidatestatusmessageConditionInput, RecruiterCandidatestatusmessagePaginationInput> {}
