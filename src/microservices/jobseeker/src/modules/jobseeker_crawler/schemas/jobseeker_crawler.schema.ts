import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerCrawlerDocument = JobseekerCrawler  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_crawler' })
export class JobseekerCrawler {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  email: string;

  @Prop()
  source: number;

  @Prop()
  crawlerId: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  lastUpdate: Date;

  @Prop()
  phoneNumber: string;

  @Prop()
  updateBy: string;

}

export const JobseekerCrawlerSchema = SchemaFactory.createForClass(JobseekerCrawler);
