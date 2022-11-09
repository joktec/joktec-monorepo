import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobSearchQuotaDocument = JobSearchQuota  & CustomMongooseDocument;

@Schema({ collection: 'job_search_quota' })
export class JobSearchQuota {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  jsId: string;

  @Prop()
  isGuest: number;

  @Prop()
  credits: number;

  @Prop()
  fulPath: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const JobSearchQuotaSchema =
  SchemaFactory.createForClass(JobSearchQuota);
