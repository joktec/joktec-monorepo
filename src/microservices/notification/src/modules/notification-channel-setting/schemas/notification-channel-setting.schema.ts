import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type NotificationChannelSettingDocument = NotificationChannelSetting &
  CustomMongooseDocument;

@Schema({ collection: 'notification_channel_setting' })
export class NotificationChannelSetting {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  channel: string;

  @Prop()
  turnOn: number;

  @Prop()
  userId: string;
}

export const NotificationChannelSettingSchema = SchemaFactory.createForClass(
  NotificationChannelSetting,
);
