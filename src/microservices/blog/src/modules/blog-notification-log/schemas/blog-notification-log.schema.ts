import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type BlogNotificationLogDocument = BlogNotificationLog &
  CustomMongooseDocument;

@Schema({ collection: 'blog_notification_log' })
export class BlogNotificationLog {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  notificationType: string;

  @Prop()
  postId: number;

  @Prop()
  userId: string;

  @Prop()
  registrationId: string;

  @Prop()
  deviceId: number;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  language: string;

  @Prop()
  clicked: number;

  @Prop()
  sentAt: Date;

  @Prop()
  isSuccess: number;
}

export const BlogNotificationLogSchema =
  SchemaFactory.createForClass(BlogNotificationLog);
