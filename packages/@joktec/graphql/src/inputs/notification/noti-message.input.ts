import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseNotiMessageInput {
  @Field(() => Int, {
    nullable: true,
  })
  isRead!: number;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  userId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  msgDetailId!: number;
}

@InputType()
export class CreateNotiMessageInput extends BaseNotiMessageInput {}

@InputType()
export class UpdateNotiMessageInput extends BaseNotiMessageInput {
  @Field()
  id!: string;
}

@InputType()
export class NotiMessagePaginationInput extends BasePaginationInput {}

@InputType()
export class NotiMessageConditionInput extends BaseConditionInput {}

@InputType()
export class NotiMessageQueryInput extends BaseQueryInput({
  conditionInput: NotiMessageConditionInput,
  paginationInput: NotiMessagePaginationInput,
})<NotiMessageConditionInput, NotiMessagePaginationInput> {}
