import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopUserAttemptLoginDocument = JobhopUserAttemptLogin &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_userattemptlogin' })
export class JobhopUserAttemptLogin {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  platform: number;

  @Prop()
  userId: string;
}

export const JobhopUserAttemptLoginSchema = SchemaFactory.createForClass(
  JobhopUserAttemptLogin,
);
