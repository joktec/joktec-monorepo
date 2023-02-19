import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class NotificationChannelSetting extends BaseTypedef {
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

@ObjectType()
export class NotificationChannelSettingDetail extends NotificationChannelSetting {}

@ObjectType()
export class NotificationChannelSettingListReponse extends BaseListResponse({
  viewDto: NotificationChannelSetting,
}) {}
