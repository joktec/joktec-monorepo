import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopScoreNotificationMissingFieldsDocument =
  JobhopScoreNotificationMissingFields & CustomMongooseDocument;

@Schema({ collection: 'jobhop_scorenotification_missing_fields' })
export class JobhopScoreNotificationMissingFields {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  scorenotificationId: number;

  @Prop()
  scorenotificationmissingfieldId: number;
}

export const JobhopScoreNotificationMissingFieldsSchema =
  SchemaFactory.createForClass(JobhopScoreNotificationMissingFields);
