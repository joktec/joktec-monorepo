import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterJobjmcreditInput {
  @Field(() => String, {
    nullable: true,
  })
  startTime!: Date;

  @Field(() => String, {
    nullable: true,
  })
  endTime!: Date;

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

  @Field(() => Int, {
    nullable: true,
  })
  planId!: number;
}

@InputType()
export class CreateRecruiterJobjmcreditInput extends BaseRecruiterJobjmcreditInput {}

@InputType()
export class UpdateRecruiterJobjmcreditInput extends BaseRecruiterJobjmcreditInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterJobjmcreditPaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterJobjmcreditConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterJobjmcreditQueryInput extends BaseQueryInput({
  conditionInput: RecruiterJobjmcreditConditionInput,
  paginationInput: RecruiterJobjmcreditPaginationInput,
})<RecruiterJobjmcreditConditionInput, RecruiterJobjmcreditPaginationInput> {}
