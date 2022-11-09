import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopJobSettingDocument = JobhopJobSetting &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_jobsetting' })
export class JobhopJobSetting {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  additionalView: number;
}

export const JobhopJobSettingSchema =
  SchemaFactory.createForClass(JobhopJobSetting);
