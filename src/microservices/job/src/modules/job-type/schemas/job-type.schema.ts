import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobTypeDocument = JobType  & CustomMongooseDocument;

@Schema({ collection: 'job_type' })
export class JobType {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  jobTypeId: string;

  @Prop()
  code: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  lastUpdate: Date;

  @Prop()
  name: string;

  @Prop()
  nameEng: string;

  @Prop()
  updateBy: string;

  @Prop()
  priority: number;
}

export const JobTypeSchema = SchemaFactory.createForClass(JobType);
