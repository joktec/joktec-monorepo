import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobInterviewDocument = JobInterview  & CustomMongooseDocument;

@Schema({ collection: 'job_interview' })
export class JobInterview {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  approved: number;

  @Prop()
  jobId: string;

  @Prop()
  requestedById: string;

  @Prop()
  attachedContract: string;

  @Prop()
  creditsBalance: number;

  @Prop()
  creditsPerInterview: number;

  @Prop()
  expiryDate: Date;

  @Prop()
  salary: number;

  @Prop()
  totalChargedCredits: number;

  @Prop()
  totalInterviewBudget: number;

  @Prop()
  statusId: number;

  @Prop()
  active: number;

  @Prop()
  creditsPending: number;

  @Prop()
  consultant: string;
}

export const JobInterviewSchema = SchemaFactory.createForClass(JobInterview);
