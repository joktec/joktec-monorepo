import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BasePushNotificationsApnsdeviceInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Int, {
    nullable: true,
  })
  active!: number;

  @Field(() => String, {
    nullable: true,
  })
  dateCreated!: Date;

  @Field(() => String, {
    nullable: true,
  })
  deviceId!: string;

  @Field(() => String, {
    nullable: true,
  })
  registrationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  userId!: number;

  @Field(() => String, {
    nullable: true,
  })
  applicationId!: string;
}

@InputType()
export class CreatePushNotificationsApnsdeviceInput extends BasePushNotificationsApnsdeviceInput {}

@InputType()
export class UpdatePushNotificationsApnsdeviceInput extends BasePushNotificationsApnsdeviceInput {
  @Field()
  id!: string;
}

@InputType()
export class PushNotificationsApnsdevicePaginationInput extends BasePaginationInput {}

@InputType()
export class PushNotificationsApnsdeviceConditionInput extends BaseConditionInput {}

@InputType()
export class PushNotificationsApnsdeviceQueryInput extends BaseQueryInput({
  conditionInput: PushNotificationsApnsdeviceConditionInput,
  paginationInput: PushNotificationsApnsdevicePaginationInput,
})<PushNotificationsApnsdeviceConditionInput, PushNotificationsApnsdevicePaginationInput> {}
