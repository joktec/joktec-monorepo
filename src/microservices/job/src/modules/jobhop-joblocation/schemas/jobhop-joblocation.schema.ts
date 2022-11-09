import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopJobLocationDocument = JobhopJobLocation &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_joblocation' })
export class JobhopJobLocation {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  jobId: string;

  @Prop()
  locationId: number;
}

export const JobhopJobLocationSchema =
  SchemaFactory.createForClass(JobhopJobLocation);
