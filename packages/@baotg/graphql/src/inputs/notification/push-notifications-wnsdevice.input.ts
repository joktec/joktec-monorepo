import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BasePushNotificationsWnsdeviceInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
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

  @Field(() => String, {
    nullable: true,
  })
  userId!: number;

  @Field(() => String, {
    nullable: true,
  })
  applicationId!: string;
}

@InputType()
export class CreatePushNotificationsWnsdeviceInput extends BasePushNotificationsWnsdeviceInput {}

@InputType()
export class UpdatePushNotificationsWnsdeviceInput extends BasePushNotificationsWnsdeviceInput {
  @Field()
  id!: string;
}

@InputType()
export class PushNotificationsWnsdevicePaginationInput extends BasePaginationInput {}

@InputType()
export class PushNotificationsWnsdeviceConditionInput extends BaseConditionInput {}

@InputType()
export class PushNotificationsWnsdeviceQueryInput extends BaseQueryInput({
  conditionInput: PushNotificationsWnsdeviceConditionInput,
  paginationInput: PushNotificationsWnsdevicePaginationInput,
})<PushNotificationsWnsdeviceConditionInput, PushNotificationsWnsdevicePaginationInput> {}
