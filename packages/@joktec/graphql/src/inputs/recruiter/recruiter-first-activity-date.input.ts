import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterFirstActivityDateInput {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  messageType!: string;

  @Field(() => String, {
    nullable: true,
  })
  device!: string;

  @Field(() => String, {
    nullable: true,
  })
  referer!: string;

  @Field(() => String, {
    nullable: true,
  })
  servletPath!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => Int, {
    nullable: true,
  })
  statusCode!: number;
}

@InputType()
export class CreateRecruiterFirstActivityDateInput extends BaseRecruiterFirstActivityDateInput {}

@InputType()
export class UpdateRecruiterFirstActivityDateInput extends BaseRecruiterFirstActivityDateInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterFirstActivityDatePaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterFirstActivityDateConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterFirstActivityDateQueryInput extends BaseQueryInput({
  conditionInput: RecruiterFirstActivityDateConditionInput,
  paginationInput: RecruiterFirstActivityDatePaginationInput,
})<RecruiterFirstActivityDateConditionInput, RecruiterFirstActivityDatePaginationInput> {}
