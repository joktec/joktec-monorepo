import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopUserScoreNotificationDocument = JobhopUserScoreNotification &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_userscorenotification' })
export class JobhopUserScoreNotification {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  sent: number;

  @Prop()
  stopped: number;

  @Prop()
  createdAt: Date;

  @Prop()
  priority: number;

  @Prop()
  scoreNotificationId: number;
}

export const JobhopUserScoreNotificationSchema = SchemaFactory.createForClass(
  JobhopUserScoreNotification,
);
