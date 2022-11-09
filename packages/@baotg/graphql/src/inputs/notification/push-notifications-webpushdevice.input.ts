import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BasePushNotificationsWebpushdeviceInput {
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
  applicationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  registrationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  p256dh!: string;

  @Field(() => String, {
    nullable: true,
  })
  auth!: string;

  @Field(() => String, {
    nullable: true,
  })
  browser!: string;

  @Field(() => Int, {
    nullable: true,
  })
  userId!: number;
}

@InputType()
export class CreatePushNotificationsWebpushdeviceInput extends BasePushNotificationsWebpushdeviceInput {}

@InputType()
export class UpdatePushNotificationsWebpushdeviceInput extends BasePushNotificationsWebpushdeviceInput {
  @Field()
  id!: string;
}

@InputType()
export class PushNotificationsWebpushdevicePaginationInput extends BasePaginationInput {}

@InputType()
export class PushNotificationsWebpushdeviceConditionInput extends BaseConditionInput {}

@InputType()
export class PushNotificationsWebpushdeviceQueryInput extends BaseQueryInput({
  conditionInput: PushNotificationsWebpushdeviceConditionInput,
  paginationInput: PushNotificationsWebpushdevicePaginationInput,
})<PushNotificationsWebpushdeviceConditionInput, PushNotificationsWebpushdevicePaginationInput> {}
