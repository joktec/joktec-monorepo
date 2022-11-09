import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerMatchscoreDocument = JobseekerMatchscore  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_matchscore' })
export class JobseekerMatchscore {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  cvId: string;

  @Prop()
  jobId: string;

  @Prop()
  matchScore: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

export const JobseekerMatchscoreSchema = SchemaFactory.createForClass(JobseekerMatchscore);
