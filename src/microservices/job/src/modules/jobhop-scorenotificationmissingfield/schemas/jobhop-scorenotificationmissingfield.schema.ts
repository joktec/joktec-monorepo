import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopScoreNotificationMissingFieldDocument =
  JobhopScoreNotificationMissingField & CustomMongooseDocument;

@Schema({ collection: 'jobhop_scorenotificationmissingfield' })
export class JobhopScoreNotificationMissingField {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  groupId: number;
}

export const JobhopScoreNotificationMissingFieldSchema =
  SchemaFactory.createForClass(JobhopScoreNotificationMissingField);
