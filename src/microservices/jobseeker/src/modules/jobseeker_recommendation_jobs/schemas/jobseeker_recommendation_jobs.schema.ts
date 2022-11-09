import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerRecommendationJobsDocument = JobseekerRecommendationJobs  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_recommendation_jobs' })
export class JobseekerRecommendationJobs {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  username: string;

  @Prop()
  score: number;

  @Prop()
  jobseekerId: string;

  @Prop()
  jobId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  cvId: string;
}

export const JobseekerRecommendationJobsSchema = SchemaFactory.createForClass(JobseekerRecommendationJobs);
