import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterLastActivityDateInput {
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
export class CreateRecruiterLastActivityDateInput extends BaseRecruiterLastActivityDateInput {}

@InputType()
export class UpdateRecruiterLastActivityDateInput extends BaseRecruiterLastActivityDateInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterLastActivityDatePaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterLastActivityDateConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterLastActivityDateQueryInput extends BaseQueryInput({
  conditionInput: RecruiterLastActivityDateConditionInput,
  paginationInput: RecruiterLastActivityDatePaginationInput,
})<RecruiterLastActivityDateConditionInput, RecruiterLastActivityDatePaginationInput> {}
