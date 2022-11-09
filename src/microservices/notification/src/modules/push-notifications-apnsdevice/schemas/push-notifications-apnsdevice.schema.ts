import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type PushNotificationsApnsdeviceDocument = PushNotificationsApnsdevice &
  CustomMongooseDocument;

@Schema({ collection: 'push_notifications_apnsdevice' })
export class PushNotificationsApnsdevice {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  active: number;

  @Prop()
  dateCreated: Date;

  @Prop()
  deviceId: string;

  @Prop()
  registrationId: string;

  @Prop()
  userId: number;

  @Prop()
  applicationId: string;
}

export const PushNotificationsApnsdeviceSchema = SchemaFactory.createForClass(
  PushNotificationsApnsdevice,
);
