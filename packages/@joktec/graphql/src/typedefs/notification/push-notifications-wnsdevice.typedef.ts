import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class PushNotificationsWnsdevice extends BaseTypedef {
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

@ObjectType()
export class PushNotificationsWnsdeviceDetail extends PushNotificationsWnsdevice {}

@ObjectType()
export class PushNotificationsWnsdeviceListReponse extends BaseListResponse({
  viewDto: PushNotificationsWnsdevice,
}) {}
