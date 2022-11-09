import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobSubscriptionHistoryDocument = JobSubscriptionHistory  & CustomMongooseDocument;

@Schema({ collection: 'job_subscription_history' })
export class JobSubscriptionHistory {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  jobName: string;

  @Prop()
  prevJobType: string;

  @Prop()
  curJobType: string;

  @Prop()
  updatedAt: Date;

  @Prop()
  userEmail: string;

  @Prop()
  jobIdId: string;
}

export const JobSubscriptionHistorySchema = SchemaFactory.createForClass(
  JobSubscriptionHistory,
);
