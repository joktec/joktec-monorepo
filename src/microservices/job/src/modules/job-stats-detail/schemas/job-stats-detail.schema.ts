import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobStatsDetailDocument = JobStatsDetail  & CustomMongooseDocument;

@Schema({ collection: 'job_stats_detail' })
export class JobStatsDetail {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  platform: number;

  @Prop()
  createDate: Date;

  @Prop()
  jobId: string;

  @Prop()
  organizationId: string;
}

export const JobStatsDetailSchema =
  SchemaFactory.createForClass(JobStatsDetail);
