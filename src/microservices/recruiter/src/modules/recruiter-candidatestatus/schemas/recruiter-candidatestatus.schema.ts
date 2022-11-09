import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RecruiterCandidatestatusDocument = RecruiterCandidatestatus &
  CustomMongooseDocument;

@Schema({ collection: 'recruiter_candidatestatus' })
export class RecruiterCandidatestatus {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  status: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  notes: string;

  @Prop()
  candidateId: string;

  @Prop()
  acceptInterview: number;

  @Prop()
  interviewId: string;
}

export const RecruiterCandidatestatusSchema = SchemaFactory.createForClass(
  RecruiterCandidatestatus,
);
