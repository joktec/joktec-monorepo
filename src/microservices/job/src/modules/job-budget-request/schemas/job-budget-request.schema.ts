import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobBudgetRequestDocument = JobBudgetRequest  & CustomMongooseDocument;

@Schema({ collection: 'job_budget_request' })
export class JobBudgetRequest {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  status: string;

  @Prop()
  jobId: string;

  @Prop()
  requestById: string;

  @Prop()
  sentReminder: number;
}

export const JobBudgetRequestSchema =
  SchemaFactory.createForClass(JobBudgetRequest);
