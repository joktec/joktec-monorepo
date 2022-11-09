import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class PushNotificationsGcmdevice extends BaseTypedef {
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

@ObjectType()
export class PushNotificationsGcmdeviceDetail extends PushNotificationsGcmdevice {}

@ObjectType()
export class PushNotificationsGcmdeviceListReponse extends BaseListResponse({
  viewDto: PushNotificationsGcmdevice,
}) {}
