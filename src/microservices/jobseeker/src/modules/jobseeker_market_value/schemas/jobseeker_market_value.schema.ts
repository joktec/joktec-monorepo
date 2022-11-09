import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerMarketValueDocument = JobseekerMarketValue  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_market_value' })
export class JobseekerMarketValue {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  username: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  cvId: string;

  @Prop()
  isJhProfile: number;

  @Prop()
  marketValue: number;

  @Prop()
  nearestMarketValue: number;

  @Prop()
  metaData: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

export const JobseekerMarketValueSchema = SchemaFactory.createForClass(JobseekerMarketValue);
