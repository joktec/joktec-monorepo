import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobSearchDocument = JobSearch  & CustomMongooseDocument;

@Schema({ collection: 'job_search' })
export class JobSearch {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  keyword: string;

  @Prop()
  createdAt: Date;

  @Prop()
  params: string;

  @Prop()
  path: string;
}

export const JobSearchSchema = SchemaFactory.createForClass(JobSearch);
