import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobInterviewHistoryDocument = JobInterviewHistory &
  CustomMongooseDocument;

@Schema({ collection: 'jobinterview_history' })
export class JobInterviewHistory {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  action: string;

  @Prop()
  jobinterviewId: number;

  @Prop()
  user: string;

  @Prop()
  organizationName: string;

  @Prop()
  candidateId: string;
}

export const JobInterviewHistorySchema =
  SchemaFactory.createForClass(JobInterviewHistory);
