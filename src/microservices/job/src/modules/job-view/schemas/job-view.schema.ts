import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobViewDocument = JobView  & CustomMongooseDocument;

@Schema({ collection: 'job_view' })
export class JobView {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  jobId: string;

  @Prop()
  createDate: Date;

  @Prop()
  numViews: number;

  @Prop()
  timeViews: Date;
}

export const JobViewSchema = SchemaFactory.createForClass(JobView);
