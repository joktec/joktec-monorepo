import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type NotificationDocument = Notification & CustomMongooseDocument;

@Schema({ collection: 'notification' })
export class Notification {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  notificationId: string;

  @Prop()
  actorId: string;

  @Prop()
  notifierId: string;

  @Prop()
  channel: string;

  @Prop()
  channelType: string;

  @Prop()
  attributes: string;

  @Prop()
  isRead: number;

  @Prop()
  isSeen: number;

  @Prop()
  sentAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  logo: string;

  @Prop()
  objectId: string;

  @Prop()
  subObjectId: string;

  @Prop()
  actionId: number;

  @Prop()
  channelId: number;

  @Prop()
  customNotificationId: number;

  @Prop()
  deleted: number;

  @Prop()
  lastUpdate: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
