import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerSkillDocument = JobseekerSkill  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_skill' })
export class JobseekerSkill {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  level: string;

  @Prop()
  skill: string;

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

export const JobseekerSkillSchema = SchemaFactory.createForClass(JobseekerSkill);
