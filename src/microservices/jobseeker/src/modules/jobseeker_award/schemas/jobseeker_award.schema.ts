import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerAwardDocument = JobseekerAward  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_award' })
export class JobseekerAward {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  organization: string;

  @Prop()
  username: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  lastUpdate: Date;

  @Prop()
  receiveTime: Date;

  @Prop()
  updateBy: string;
}

export const JobseekerAwardSchema = SchemaFactory.createForClass(JobseekerAward);
