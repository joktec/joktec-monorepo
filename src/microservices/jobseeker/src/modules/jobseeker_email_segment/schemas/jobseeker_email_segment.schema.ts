import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerEmailSegmentDocument = JobseekerEmailSegment  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_email_segment' })
export class JobseekerEmailSegment {
  @Prop({ default: uuid() })
  _id: string;
  
  // @Prop()
  // segmentId: string;

  @Prop()
  segmentName: string;

  @Prop()
  latestTrigger: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: string;

  @Prop()
  routineId: string;
}

export const JobseekerEmailSegmentSchema = SchemaFactory.createForClass(JobseekerEmailSegment);
