import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BasePushNotificationsGcmdeviceInput {
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

  @Field(() => Int, {
    nullable: true,
  })
  deviceId!: number;

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
  cloudMessageType!: string;

  @Field(() => String, {
    nullable: true,
  })
  applicationId!: string;
}

@InputType()
export class CreatePushNotificationsGcmdeviceInput extends BasePushNotificationsGcmdeviceInput {}

@InputType()
export class UpdatePushNotificationsGcmdeviceInput extends BasePushNotificationsGcmdeviceInput {
  @Field()
  id!: string;
}

@InputType()
export class PushNotificationsGcmdevicePaginationInput extends BasePaginationInput {}

@InputType()
export class PushNotificationsGcmdeviceConditionInput extends BaseConditionInput {}

@InputType()
export class PushNotificationsGcmdeviceQueryInput extends BaseQueryInput({
  conditionInput: PushNotificationsGcmdeviceConditionInput,
  paginationInput: PushNotificationsGcmdevicePaginationInput,
})<PushNotificationsGcmdeviceConditionInput, PushNotificationsGcmdevicePaginationInput> {}
