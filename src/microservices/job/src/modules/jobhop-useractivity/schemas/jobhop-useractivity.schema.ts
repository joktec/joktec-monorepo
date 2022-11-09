import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopUserActivityDocument = JobhopUserActivity &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_useractivity' })
export class JobhopUserActivity {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  platform: number;

  @Prop()
  email: string;

  @Prop()
  extraData: string;

  @Prop()
  userId: string;

  @Prop()
  eventType: string;
}

export const JobhopUserActivitySchema =
  SchemaFactory.createForClass(JobhopUserActivity);
