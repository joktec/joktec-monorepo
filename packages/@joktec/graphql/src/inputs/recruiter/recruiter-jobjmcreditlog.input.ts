import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterJobjmcreditlogInput {
  @Field(() => Int, {
    nullable: true,
  })
  creditBurned!: number;

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
  jobId!: string;
}

@InputType()
export class CreateRecruiterJobjmcreditlogInput extends BaseRecruiterJobjmcreditlogInput {}

@InputType()
export class UpdateRecruiterJobjmcreditlogInput extends BaseRecruiterJobjmcreditlogInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterJobjmcreditlogPaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterJobjmcreditlogConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterJobjmcreditlogQueryInput extends BaseQueryInput({
  conditionInput: RecruiterJobjmcreditlogConditionInput,
  paginationInput: RecruiterJobjmcreditlogPaginationInput,
})<RecruiterJobjmcreditlogConditionInput, RecruiterJobjmcreditlogPaginationInput> {}
