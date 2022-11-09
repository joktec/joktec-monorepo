import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidatePerferenceHistoryDocument = CandidatePerferenceHistory &
  CustomMongooseDocument;

@Schema({ collection: 'candidate_perference_history' })
export class CandidatePerferenceHistory {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  jobId: string;
  @Prop()
  jobName: string;
  @Prop()
  user: string;
  @Prop()
  action: string;
}

export const CandidatePerferenceHistorySchema = SchemaFactory.createForClass(
  CandidatePerferenceHistory,
);
