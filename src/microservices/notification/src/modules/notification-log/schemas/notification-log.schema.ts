import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type NotificationLogDocument = NotificationLog & CustomMongooseDocument;

@Schema({ collection: 'notification_log' })
export class NotificationLog {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  notificationType: string;

  @Prop()
  actionId: string;

  @Prop()
  objectId: string;

  @Prop()
  subObjectId: string;

  @Prop()
  isSuccess: number;

  @Prop()
  messageId: string;

  @Prop()
  lang: string;

  @Prop()
  sentAt: Date;

  @Prop()
  description: string;

  @Prop()
  jobseekerId: string;
}

export const NotificationLogSchema =
  SchemaFactory.createForClass(NotificationLog);
