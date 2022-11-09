import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobBudgetDocument = JobBudget  & CustomMongooseDocument;

@Schema({ collection: 'job_budget' })
export class JobBudget {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  totalCredits: number;

  @Prop()
  remainingCredits: number;

  @Prop()
  viewCount: number;

  @Prop()
  candidateCount: number;

  @Prop()
  active: number;

  @Prop()
  expiryDate: Date;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  jobId: string;

  @Prop()
  platform: number;
}

export const JobBudgetSchema = SchemaFactory.createForClass(JobBudget);
