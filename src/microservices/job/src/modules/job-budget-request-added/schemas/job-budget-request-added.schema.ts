import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobBudgetRequestAddedtDocument = JobBudgetRequestAdded  & CustomMongooseDocument;

@Schema({ collection: 'job_budget_request_added' })
export class JobBudgetRequestAdded {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  updatedBudget: number;

  @Prop()
  jobId: string;

  @Prop()
  paidById: string;

  @Prop()
  sentReminder: number;
}

export const JobBudgetRequestAddedSchema = SchemaFactory.createForClass(
  JobBudgetRequestAdded,
);
