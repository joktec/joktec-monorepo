import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobBountyHistoryDocument = JobBountyHistory  & CustomMongooseDocument;

@Schema({ collection: 'job_bounty_history' })
export class JobBountyHistory {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  action: string;

  @Prop()
  userEmail: string;

  @Prop()
  jobBountyId: number;
}

export const JobBountyHistorySchema =
  SchemaFactory.createForClass(JobBountyHistory);
