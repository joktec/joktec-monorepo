import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobBudgetSuggestInfoDocument = JobBudgetSuggestInfo  & CustomMongooseDocument;

@Schema({ collection: 'job_budget_suggest_info' })
export class JobBudgetSuggestInfo {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  info: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  jobId: string;

  @Prop()
  creditBalance: number;
}

export const JobBudgetSuggestInfoSchema =
  SchemaFactory.createForClass(JobBudgetSuggestInfo);
