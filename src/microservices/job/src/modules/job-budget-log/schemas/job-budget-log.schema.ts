import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobBudgetLogDocument = JobBudgetLog  & CustomMongooseDocument;

@Schema({ collection: 'job_budget_log' })
export class JobBudgetLog {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  credits: number;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  createdById: string;

  @Prop()
  eventType: number;

  @Prop()
  jobId: string;

  @Prop()
  updatedById: string;

  @Prop()
  isThumbedUp: number;

  @Prop()
  candidateId: string;

  @Prop()
  remainingCredits: number;

  @Prop()
  staffUser: string;

  @Prop()
  prevBalance: number;

  @Prop()
  platform: number;

  @Prop()
  note: string;

  @Prop()
  orgRemainingCredits: number;

  @Prop()
  organizationId: string;

  @Prop()
  orgTotalCredits: number;

  @Prop()
  isNegative: number;

  @Prop()
  totalInterviewBudget: number;

  @Prop()
  type: number;
}

export const JobBudgetLogSchema = SchemaFactory.createForClass(JobBudgetLog);
