import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerSegmentRoutineDocument = JobseekerSegmentRoutine  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_segment_routine' })
export class JobseekerSegmentRoutine {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  routineName: string;
  
  @Prop()
  templateOrder: string;

  @Prop()
  isActive: number;

  @Prop()
  isDefault: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const JobseekerSegmentRoutineSchema = SchemaFactory.createForClass(JobseekerSegmentRoutine);
