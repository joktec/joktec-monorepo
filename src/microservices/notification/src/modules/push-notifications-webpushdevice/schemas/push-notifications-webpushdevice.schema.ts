import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type PushNotificationsWebpushdeviceDocument =
  PushNotificationsWebpushdevice & CustomMongooseDocument;

@Schema({ collection: 'push_notifications_webpushdevice' })
export class PushNotificationsWebpushdevice {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  active: number;

  @Prop()
  dateCreated: Date;

  @Prop()
  applicationId: string;

  @Prop()
  registrationId: string;

  @Prop()
  p256dh: string;

  @Prop()
  auth: string;

  @Prop()
  browser: string;

  @Prop()
  userId: number;
}

export const PushNotificationsWebpushdeviceSchema =
  SchemaFactory.createForClass(PushNotificationsWebpushdevice);
