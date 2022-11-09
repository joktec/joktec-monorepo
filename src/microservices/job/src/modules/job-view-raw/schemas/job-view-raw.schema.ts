import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobViewRawDocument = JobViewRaw  & CustomMongooseDocument;

@Schema({ collection: 'job_view_raw' })
export class JobViewRaw {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  viewId: number;

  @Prop()
  createDate: Date;

  @Prop()
  jobId: string;

  @Prop()
  userId: string;
}

export const JobViewRawSchema = SchemaFactory.createForClass(JobViewRaw);
