import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseRecruiterActivityInput {
  @Field(() => String, {
    nullable: true,
  })
  recruiterId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  objectId!: string;

  @Field(() => String, {
    nullable: true,
  })
  objectRepr!: string;

  @Field(() => String, {
    nullable: true,
  })
  objectType!: string;

  @Field(() => String, {
    nullable: true,
  })
  activityType!: string;

  @Field(() => String, {
    nullable: true,
  })
  message!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  isSystemActivity!: number;

  @Field(() => String, {
    nullable: true,
  })
  messageJson!: string;
}

@InputType()
export class CreateRecruiterActivityInput extends BaseRecruiterActivityInput {}

@InputType()
export class UpdateRecruiterActivityInput extends BaseRecruiterActivityInput {
  @Field()
  id!: string;
}

@InputType()
export class RecruiterActivityPaginationInput extends BasePaginationInput {}

@InputType()
export class RecruiterActivityConditionInput extends BaseConditionInput {}

@InputType()
export class RecruiterActivityQueryInput extends BaseQueryInput({
  conditionInput: RecruiterActivityConditionInput,
  paginationInput: RecruiterActivityPaginationInput,
})<RecruiterActivityConditionInput, RecruiterActivityPaginationInput> {}
