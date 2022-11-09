import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class PushNotificationsWebpushdevice extends BaseTypedef {
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

@ObjectType()
export class PushNotificationsWebpushdeviceDetail extends PushNotificationsWebpushdevice {}

@ObjectType()
export class PushNotificationsWebpushdeviceListReponse extends BaseListResponse({
  viewDto: PushNotificationsWebpushdevice,
}) {}
