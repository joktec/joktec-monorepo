import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerLevelExpectedDocument = JobseekerLevelExpected  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_level_expected' })
export class JobseekerLevelExpected {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  levelId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  jobseekerId: string;
}

export const JobseekerLevelExpectedSchema = SchemaFactory.createForClass(JobseekerLevelExpected);
