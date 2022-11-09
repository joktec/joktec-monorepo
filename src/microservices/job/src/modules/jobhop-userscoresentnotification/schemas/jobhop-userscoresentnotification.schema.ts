import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopUserScoreSentNotificationDocument =
  JobhopUserScoreSentNotification & CustomMongooseDocument;

@Schema({ collection: 'jobhop_userscoresentnotification' })
export class JobhopUserScoreSentNotification {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  scoreNotificationId: number;

  @Prop()
  clicked: number;
}

export const JobhopUserScoreSentNotificationSchema =
  SchemaFactory.createForClass(JobhopUserScoreSentNotification);
