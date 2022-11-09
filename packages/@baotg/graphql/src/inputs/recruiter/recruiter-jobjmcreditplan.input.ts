import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterJobjmcreditplanInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Int, {
    nullable: true,
  })
  weeklyProcessedCv!: number;

  @Field(() => Int, {
    nullable: true,
  })
  dailyImporession!: string;
}

@InputType()
export class CreateRecruiterJobjmcreditplanInput extends BaseRecruiterJobjmcreditplanInput {}

@InputType()
export class UpdateRecruiterJobjmcreditplanInput extends BaseRecruiterJobjmcreditplanInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterJobjmcreditplanPaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterJobjmcreditplanConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterJobjmcreditplanQueryInput extends BaseQueryInput({
  conditionInput: RecruiterJobjmcreditplanConditionInput,
  paginationInput: RecruiterJobjmcreditplanPaginationInput,
})<RecruiterJobjmcreditplanConditionInput, RecruiterJobjmcreditplanPaginationInput> {}
