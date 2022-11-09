import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobStatsDocument = JobStats  & CustomMongooseDocument;

@Schema({ collection: 'job_stats' })
export class JobStats {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  totalCount: number;

  @Prop()
  jhCount: number;

  @Prop()
  vneCount: number;

  @Prop()
  jobId: string;

  @Prop()
  organizationId: string;
}

export const JobStatsSchema = SchemaFactory.createForClass(JobStats);
