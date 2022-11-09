import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopEmailHistoryDocument = JobhopEmailHistory &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_emailhistory' })
export class JobhopEmailHistory {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  interviewerEmail: string;

  @Prop()
  candidateEmail: string;

  @Prop()
  subject: string;
}

export const JobhopEmailHistorySchema =
  SchemaFactory.createForClass(JobhopEmailHistory);
