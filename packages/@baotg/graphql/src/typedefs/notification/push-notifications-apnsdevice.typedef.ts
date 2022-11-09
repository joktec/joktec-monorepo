import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class PushNotificationsApnsdevice extends BaseTypedef {
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

@ObjectType()
export class PushNotificationsApnsdeviceDetail extends PushNotificationsApnsdevice {}

@ObjectType()
export class PushNotificationsApnsdeviceListReponse extends BaseListResponse({
  viewDto: PushNotificationsApnsdevice,
}) {}
