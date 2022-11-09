import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobLinkDocument = JobLink  & CustomMongooseDocument;

@Schema({ collection: 'job_link' })
export class JobLink {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  jobId: string;

  @Prop()
  lastUpdate: Date;

  @Prop()
  link: string;

  @Prop()
  updateBy: string;
}

export const JobLinkSchema = SchemaFactory.createForClass(JobLink);
