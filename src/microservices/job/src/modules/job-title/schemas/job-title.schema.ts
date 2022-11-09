import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobTitleDocument = JobTitle  & CustomMongooseDocument;

@Schema({ collection: 'job_title' })
export class JobTitle {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  name: string;

  @Prop()
  nameEn: string;

  @Prop()
  priority: number;
}

export const JobTitleSchema = SchemaFactory.createForClass(JobTitle);
