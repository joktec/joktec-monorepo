import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterContactInput {
  @Field(() => String, {
    nullable: true,
  })
  fullName!: string;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  company!: string;

  @Field(() => String, {
    nullable: true,
  })
  location!: string;

  @Field(() => String, {
    nullable: true,
  })
  referralEmail!: string;
}

@InputType()
export class CreateRecruiterContactInput extends BaseRecruiterContactInput {}

@InputType()
export class UpdateRecruiterContactInput extends BaseRecruiterContactInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterContactPaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterContactConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterContactQueryInput extends BaseQueryInput({
  conditionInput: RecruiterContactConditionInput,
  paginationInput: RecruiterContactPaginationInput,
})<RecruiterContactConditionInput, RecruiterContactPaginationInput> {}
