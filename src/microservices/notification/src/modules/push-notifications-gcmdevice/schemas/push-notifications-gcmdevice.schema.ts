import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type PushNotificationsGcmdeviceDocument = PushNotificationsGcmdevice &
  CustomMongooseDocument;

@Schema({ collection: 'push_notifications_gcmdevice' })
export class PushNotificationsGcmdevice {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  active: number;

  @Prop()
  dateCreated: Date;

  @Prop()
  deviceId: number;

  @Prop()
  registrationId: string;

  @Prop()
  userId: number;

  @Prop()
  cloudMessageType: string;

  @Prop()
  applicationId: string;
}

export const PushNotificationsGcmdeviceSchema = SchemaFactory.createForClass(
  PushNotificationsGcmdevice,
);
