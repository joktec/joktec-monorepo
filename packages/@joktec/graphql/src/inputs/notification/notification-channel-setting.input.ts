import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseNotificationChannelSettingInput {
  @Field(() => String, {
    nullable: true,
  })
  channel!: string;

  @Field(() => Int, {
    nullable: true,
  })
  turnOn!: number;

  @Field(() => String, {
    nullable: true,
  })
  userId!: string;
}

@InputType()
export class CreateNotificationChannelSettingInput extends BaseNotificationChannelSettingInput {}

@InputType()
export class UpdateNotificationChannelSettingInput extends BaseNotificationChannelSettingInput {
  @Field()
  id!: string;
}

@InputType()
export class NotificationChannelSettingPaginationInput extends BasePaginationInput {}

@InputType()
export class NotificationChannelSettingConditionInput extends BaseConditionInput {}

@InputType()
export class NotificationChannelSettingQueryInput extends BaseQueryInput({
  conditionInput: NotificationChannelSettingConditionInput,
  paginationInput: NotificationChannelSettingPaginationInput,
})<NotificationChannelSettingConditionInput, NotificationChannelSettingPaginationInput> {}
