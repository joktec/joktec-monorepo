import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopUserJobSentreccDocument = JobhopUserJobSentrecc &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_userjobsentrecc' })
export class JobhopUserJobSentrecc {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  jobId: string;

  @Prop()
  userId: string;
}

export const JobhopUserJobSentreccSchema = SchemaFactory.createForClass(
  JobhopUserJobSentrecc,
);
