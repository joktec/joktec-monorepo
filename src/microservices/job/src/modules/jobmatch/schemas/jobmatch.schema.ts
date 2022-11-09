import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobMatchDocument = JobMatch & CustomMongooseDocument;

@Schema({ collection: 'jobmatch' })
export class JobMatch {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  cos: number;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  cvId: string;

  @Prop()
  jobId: string;

  @Prop()
  referralId: string;

  @Prop()
  lastUpdate: Date;

  @Prop()
  updateBy: string;

  @Prop()
  applyBy: string;

  @Prop()
  applyType: string;

  @Prop()
  platform: number;

  @Prop()
  response: string;
}

export const JobMatchSchema = SchemaFactory.createForClass(JobMatch);
