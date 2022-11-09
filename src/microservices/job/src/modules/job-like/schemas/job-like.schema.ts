import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobLikeDocument = JobLike  & CustomMongooseDocument;

@Schema({ collection: 'job_like' })
export class JobLike {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  like: number;

  @Prop()
  jobId: string;

  @Prop()
  lastUpdate: Date;

  @Prop()
  username: string;
}

export const JobLikeSchema = SchemaFactory.createForClass(JobLike);
