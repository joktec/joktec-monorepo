import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobBudgetHistoryDocument = JobBudgetHistory  & CustomMongooseDocument;

@Schema({ collection: 'job_budget_history' })
export class JobBudgetHistory {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  description: number;

  @Prop()
  balance: number;

  @Prop()
  prevBalance: number;

  @Prop()
  credits: number;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  jobId: string;

  @Prop()
  platform: number;
}

export const JobBudgetHistorySchema =
  SchemaFactory.createForClass(JobBudgetHistory);
