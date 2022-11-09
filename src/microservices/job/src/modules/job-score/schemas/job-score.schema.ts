import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobScoreDocument = JobScore  & CustomMongooseDocument;

@Schema({ collection: 'job_score' })
export class JobScore {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  jobId: string;

  @Prop()
  score: number;
}

export const JobScoreSchema = SchemaFactory.createForClass(JobScore);
