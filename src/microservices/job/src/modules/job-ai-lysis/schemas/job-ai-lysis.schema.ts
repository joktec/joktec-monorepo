import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobAiLysisDocument = JobAiLysis & CustomMongooseDocument;

@Schema({ collection: 'job_ai_lysis' })
export class JobAiLysis {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  credits: number;

  @Prop()
  expiryDate: Date;

  @Prop()
  isVerified: number;

  @Prop()
  organizationId: string;

  @Prop()
  remainingCredits: number;

  @Prop()
  sapCompanyId: string;

  @Prop()
  updatedAt: Date;

  @Prop()
  updatedBy: string;
}

export const JobAiLysisSchema = SchemaFactory.createForClass(JobAiLysis);
