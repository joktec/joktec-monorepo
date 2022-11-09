import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobMatchBudgetSentDocument = JobMatchBudgetSent &
  CustomMongooseDocument;

@Schema({ collection: 'jobmatch_budget_sent' })
export class JobMatchBudgetSent {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  sent: number;

  @Prop()
  organizationId: string;

  @Prop()
  staffSent: number;
}

export const JobMatchBudgetSentSchema =
  SchemaFactory.createForClass(JobMatchBudgetSent);
