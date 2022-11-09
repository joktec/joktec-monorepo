import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerLanguageDocument = JobseekerLanguage  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_language' })
export class JobseekerLanguage {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  language: string;

  @Prop()
  level: string;

  @Prop()
  username: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  lastUpdate: Date;

  @Prop()
  updateBy: string;
}

export const JobseekerLanguageSchema = SchemaFactory.createForClass(JobseekerLanguage);
