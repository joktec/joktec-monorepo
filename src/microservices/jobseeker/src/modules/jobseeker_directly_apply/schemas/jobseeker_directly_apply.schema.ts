import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerDirectlyApplyDocument = JobseekerDirectlyApply  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_directly_apply' })
export class JobseekerDirectlyApply {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  applyDate: Date;

  @Prop()
  createDate: Date;

  @Prop()
  cvId: string;

  @Prop()
  hopScore: number; 
  
  @Prop()
  jobId: string;

  @Prop()
  jobVersionId: string;

  @Prop()
  jsId: string;

  @Prop()
  applyBy: string;

  @Prop() 
  applyType: string;
}

export const JobseekerDirectlyApplySchema = SchemaFactory.createForClass(JobseekerDirectlyApply);
