import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerWorkExperienceDocument = JobseekerWorkExperience  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_work_experience' })
export class JobseekerWorkExperience {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()           
  company: string;

  @Prop()
  detail: string;
  
  @Prop()
  position: string;

  @Prop()
  username: string;
  
  @Prop()
  deleted: number;

  @Prop()
  createBy: string;
  
  @Prop()
  createDate: Date;

  @Prop()
  endDate: Date;
  
  @Prop()
  lastUpdate: Date;

  @Prop()
  startDate: Date;
  
  @Prop()
  stillWorking: number;

  @Prop()
  updateBy: string;
  
  @Prop()
  industryId: string;

  @Prop()
  levelId: string;

  @Prop()    
  yearExp: string;

  @Prop()
  positionDetail: string;
}

export const JobseekerWorkExperienceSchema = SchemaFactory.createForClass(JobseekerWorkExperience);
