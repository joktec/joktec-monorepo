import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type PushNotificationsWnsdeviceDocument = PushNotificationsWnsdevice &
  CustomMongooseDocument;

@Schema({ collection: 'push_notifications_wnsdevice' })
export class PushNotificationsWnsdevice {
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

export const PushNotificationsWnsdeviceSchema = SchemaFactory.createForClass(
  PushNotificationsWnsdevice,
);
