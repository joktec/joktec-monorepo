import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopScoreNotificationDocument = JobhopScoreNotification &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_scorenotification' })
export class JobhopScoreNotification {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  priority: number;

  @Prop()
  priority2: number;

  @Prop()
  screenCode: number;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  titleVi: string;

  @Prop()
  bodyVi: string;

  @Prop()
  active: number;

  @Prop()
  email: string;

  @Prop()
  emailVi: string;
}

export const JobhopScoreNotificationSchema = SchemaFactory.createForClass(
  JobhopScoreNotification,
);
