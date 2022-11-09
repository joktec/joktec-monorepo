import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerActivityDateDocument = JobseekerActivityDate  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_activity_date' })
export class JobseekerActivityDate {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  username: string;

  @Prop()
  device: string;

  @Prop()
  referer: string;

  @Prop()
  status: string;

  @Prop()
  createdDate: Date;

  @Prop()
  messageType: string;

  @Prop()
  servletPath: string;

  @Prop()
  statusCode: number;

}

export const JobseekerActivityDateSchema = SchemaFactory.createForClass(JobseekerActivityDate);
